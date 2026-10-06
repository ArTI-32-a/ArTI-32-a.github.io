import type { BaseFrontmatter } from "@/content.config";
import { Common as C } from "@/utils/Common/Common";
// import { Common as C } from "../Common/Common.ts";

interface SearchDocument extends BaseFrontmatter
{
    href: string;

    [field: string]: unknown;
}

// —— 段 ——
interface Segment
{
    text: string;
    target: string;
}

const str = C.SEARCH_KIND_STRING_NAME;
// —— 字段配置 ——
interface FieldConfig
{
    field: string;
    kind: 
        typeof C.SEARCH_KIND_STRING_NAME | 
        typeof C.SEARCH_KIND_ARRAY_NAME;      // str: 字符串; element: 数组（比较元素）
    formatChar?: string;
    canOccupy?: boolean;
}

// —— 匹配结果 ——
interface MatchResult
{
    titleScore: number;
    tagsScore: number;
    totalScore: number;
}

// —— search 参数 ——
interface SearchOptions
{
    query: string;
    config: FieldConfig[];
    docs: SearchDocument[];
    titleWeight?: number;
    otherWeight?: number;
    tagsWeight?: number;
    threshold?: number;
}

// —— search 返回 ——
interface SearchResult
{
    doc: SearchDocument;
    score: MatchResult;
}

export type
{
    SearchDocument,
    Segment,
    FieldConfig,
    MatchResult,
    SearchOptions,
    SearchResult,
};

interface StringMatch
{
    start: number;   // 匹配起始位置
    end: number;     // 匹配结束位置(不含)
    score: number;   // 有效长度(未计分的字符数)
}

interface ArrayMatch
{
    index: number;   // 匹配到的数组下标
    score: number;   // 有效长度(数组场景下 = text 长度,因为元素是整体占用的)
}

interface MatchContext
{
    occupiedStrings: Map<string, boolean[]>;  // 字段名 → 每个字符是否已占
    occupiedArrays: Map<string, Set<number>>; // 字段名 → 已占下标
    mixedMode: boolean;
}

interface SegmentMatch
{
    fieldName: string;
    kind: "str" | "element";
    index: number;   // str: 起始位置；element: 数组下标
    score: number;   // str: 有效字符数；element: textLen（贡献度上层算）
}

interface SplitQuery
{
    // 每个原 title 段拆成一组的子段
    // 组内段必须按顺序匹配
    titleGroups: Segment[][];

    // tag 段原样保留，单独处理
    tagSegments: Segment[];
}

interface TitleGroupResult
{
    fieldName: string;
    scores: number[];   // 每个子段的 score
}


class SearchCoreContribution
{
        public static runNormal(
        query: string,
        config: FieldConfig[],
        docs: SearchDocument[],
        titleWeight: number,
        tagsWeight: number,
        otherWeight: number,
    ): SearchResult[]
    {
        const segments = this.parseQuery(query, config);

        return docs.map(d => ({
            doc: d,
            score: this.matchDocument(d, segments, config, titleWeight, tagsWeight, otherWeight),
        }));
    }

    public static runSplit(
        query: string,
        config: FieldConfig[],
        docs: SearchDocument[],
        titleWeight: number,
        tagsWeight: number,
        otherWeight: number,
    ): SearchResult[]
    {
        const segments = this.parseQuery(query, config);
        const split = this.parseQuerySplit(segments);
        return docs.map(d => ({
            doc: d,
            score: this.matchDocumentSplit(d, split, config, titleWeight, tagsWeight, otherWeight),
        }));
    }



    // ---------- private ----------
    private static finalizeSegments(titleChunks: string[], tagSegments: Segment[]): Segment[]
    {
        // title chunk 按 ';' 和空白切分成段
        const titleSegments: Segment[] = [];
        for (const chunk of titleChunks)
        {
            const parts: string[] = chunk.split(/[;\s\uFF1B]+/);
            for (const part of parts)
            {
                const trimmed: string = part.trim();
                if (trimmed.length > 0)
                {
                    titleSegments.push({ text: trimmed, target: C.SEARCH_KIND_STRING_NAME });
                }
            }
        }

        // 排序：title 组 / 显式 tag 组 / 普通 tag 组，各自独立排
        SearchCoreContribution.sortByContainment(titleSegments);

        const explicitTags: Segment[] = tagSegments.filter(SearchCoreContribution.isExplicitTag);
        const normalTags: Segment[] = tagSegments.filter(s => !SearchCoreContribution.isExplicitTag(s));

        SearchCoreContribution.sortByContainment(explicitTags);
        SearchCoreContribution.sortByContainment(normalTags);

        return [...titleSegments, ...explicitTags, ...normalTags];
    }



    private static parseQuery(raw: string, config: FieldConfig[]): Segment[]
    {
        // 1. formatChar → field
        const formatMap: Map<string, string> = new Map();
        for (const fc of config)
        {
            if (fc.formatChar !== undefined)
            {
                formatMap.set(fc.formatChar, fc.field);
            }
        }

        // 2. 状态
        const titleChunks: string[] = [];
        const tagSegments: Segment[] = [];

        let i: number = 0;
        let inTag: boolean = false;
        let titleBuf: string = "";
        let tagBuf: string = "";
        let tagTarget: string = C.SEARCH_KIND_ARRAY_NAME;

        // 3. flush：把缓冲区推入数组
        function flushTitle(): void
        {
            if (titleBuf.length > 0)
            {
                titleChunks.push(titleBuf);
                titleBuf = "";
            }
        }

        function flushTag(): void
        {
            const trimmed: string = tagBuf.trim();
            if (trimmed.length > 0)
            {
                tagSegments.push({ text: trimmed, target: tagTarget });
            }
            tagBuf = "";
            tagTarget = C.SEARCH_KIND_ARRAY_NAME;
        }

        // 4. 刚进入 tag 时，尝试消费一个 formatChar
        function tryConsumeFormatChar(): void
        {
            if (i >= raw.length) return;

            const ch: string = raw[i];
            if (ch === " " || ch === "\n" || ch === "\r" || ch === "#") return;

            if (formatMap.has(ch))
            {
                tagTarget = formatMap.get(ch)!;
                i++;
            }
        }

        // 5. 状态机主循环
        while (i < raw.length)
        {
            const ch: string = raw[i];

            if (inTag)
            {
                // —— tag 模式 ——
                // if (ch === "#" || ch === "\n" || ch === "\r")
                // {
                //     flushTag();
                //     inTag = false;
                //     // 跳过 \r\n
                //     if (ch === "\r" && i + 1 < raw.length && raw[i + 1] === "\n") i++;
                //     i++;
                // }
                // else if (ch === "\\" && i + 1 < raw.length)
                // {
                //     tagBuf += raw[i + 1];
                //     i += 2;
                // }
                if (ch === "\\" && i + 1 < raw.length)
                {
                    tagBuf += raw[i + 1];
                    i += 2;
                }
                else if (ch === "#" || ch === "\n" || ch === "\r")
                {
                    flushTag();
                    inTag = false;
                    // 跳过 \r\n
                    if (ch === "\r" && i + 1 < raw.length && raw[i + 1] === "\n") i++;
                    i++;
                }
                else
                {
                    tagBuf += ch;
                    i++;
                }
            }
            else
            {
                // —— title 模式 ——
                if (ch === "#")
                {
                    flushTitle();
                    inTag = true;
                    i++;
                    tryConsumeFormatChar();
                }
                else if (ch === "\\" && i + 1 < raw.length)
                {
                    titleBuf += raw[i + 1];
                    i += 2;
                }
                else
                {
                    titleBuf += ch;
                    i++;
                }
            }
        }

        // 6. 收尾 flush
        flushTitle();
        if (inTag) flushTag();

        // 7. 切分 title + 排序 + 拼接
        return SearchCoreContribution.finalizeSegments(titleChunks, tagSegments);
    }

    private static parseQuerySplit(segments: Segment[]): SplitQuery
    {
        const titleGroups: Segment[][] = [];
        const tagSegments: Segment[] = [];

        for (const seg of segments)
        {
            if (seg.target === C.SEARCH_KIND_STRING_NAME)
            {
                // title 段：拆
                const parts = SearchCoreContribution.splitTitleSegment(seg.text);
                if (parts.length > 0)
                {
                    titleGroups.push(
                        parts.map(p => ({ text: p, target: C.SEARCH_KIND_STRING_NAME }))
                    );
                }
            }
            else
            {
                // tag 段：原样保留
                tagSegments.push(seg);
            }
        }

        return { titleGroups, tagSegments };
    }

    private static splitTitleSegment(text: string): string[]
    {
        const parts = text.split(/([\u4e00-\u9fff\u3400-\u4dbf]+)/);
        const result: string[] = [];

        for (let i = 0; i < parts.length; i++)
        {
            const part = parts[i];
            if (part.length === 0) continue;

            if (i % 2 === 1)
            {
                // 中文段：逐字拆
                for (const ch of part)
                {
                    const t = ch.trim();
                    if (t.length > 0) result.push(t);
                }
            }
            else
            {
                // 非中文段：按空格拆
                for (const w of part.split(/\s+/))
                {
                    const t = w.trim();
                    if (t.length > 0) result.push(t);
                }
            }
        }

        return result;
    }

    private static sortByContainment(segments: Segment[]): void
    {
        let changed: boolean = true;

        while (changed)
        {
            changed = false;

            for (let i = 0; i < segments.length; i++)
            {
                const a: string = segments[i].text.toLowerCase();

                for (let j = i + 1; j < segments.length; j++)
                {
                    const b: string = segments[j].text.toLowerCase();

                    // b 包含 a 且两者不相等（相等不动）
                    if (a !== b && b.includes(a))
                    {
                        const [seg] = segments.splice(j, 1);
                        segments.splice(i, 0, seg);
                        changed = true;
                        break;
                    }
                }

                if (changed) break;
            }
        }
    }

    private static isExplicitTag(seg: Segment): boolean
    {
        return seg.target !== C.SEARCH_KIND_STRING_NAME
            && seg.target !== C.SEARCH_KIND_ARRAY_NAME;
    }



    private static matchInStringFrom(
        text: string,
        target: string,
        occupied: boolean[],
        requireFullyFree: boolean,
        minStart: number,
    ): StringMatch | null
    {
        const lowerText: string = text.toLowerCase();
        const lowerTarget: string = target.toLowerCase();
        const textLen: number = lowerText.length;
        const targetLen: number = lowerTarget.length;

        if (textLen === 0 || textLen > targetLen) return null;

        for (let start = minStart; start <= targetLen - textLen; start++)
        {
            if (lowerTarget.substring(start, start + textLen) !== lowerText) continue;

            let occupiedCount: number = 0;
            for (let j = 0; j < textLen; j++)
            {
                if (occupied[start + j]) occupiedCount++;
            }

            if (requireFullyFree)
            {
                if (occupiedCount === 0)
                {
                    return { start, end: start + textLen, score: textLen };
                }
            }
            else
            {
                const score: number = textLen - occupiedCount;
                if (score > 0)
                {
                    return { start, end: start + textLen, score };
                }
            }
        }

        return null;
    }

    private static matchInString(
        text: string,
        target: string,
        occupied: boolean[],
        requireFullyFree: boolean,
    ): StringMatch | null
    {
        return SearchCoreContribution.matchInStringFrom(text, target, occupied, requireFullyFree, 0);
    }

    private static matchInArray(
        text: string,
        targets: string[],
        occupied: Set<number>,
    ): ArrayMatch | null
    {
        const lowerText: string = text.toLowerCase();
        const textLen: number = lowerText.length;

        if (textLen === 0) return null;

        let bestIndex: number = -1;
        let bestScore: number = 0;

        for (let i = 0; i < targets.length; i++)
        {
            if (occupied.has(i)) continue;

            const target: string = targets[i];
            if (target.length < textLen) continue;

            if (target.toLowerCase().includes(lowerText))
            {
                // 贡献度 = text 长度 / 元素长度
                const score: number = textLen / target.length;
                if (score > bestScore)
                {
                    bestScore = score;
                    bestIndex = i;
                }
                // 平局时保留前面找到的(下标靠前优先)
            }
        }

        if (bestIndex === -1) return null;

        return { index: bestIndex, score: textLen };
    }

    private static matchSegment(
        seg: Segment,
        doc: SearchDocument,
        config: FieldConfig[],
        ctx: MatchContext,
    ): SegmentMatch | null
    {
        // const docRec = doc as unknown as Record<string, unknown>;
        // const raw = doc[fc.field];

        // 决定候选字段
        let candidates: FieldConfig[];

        if (seg.target === C.SEARCH_KIND_STRING_NAME)
        {
            if (ctx.mixedMode)
            {
                candidates = config.filter(fc => fc.kind === "str");
            }
            else
            {
                candidates = config.filter(fc => fc.kind === "str" || fc.kind === "element");
            }
        }
        else if (seg.target === C.SEARCH_KIND_ARRAY_NAME)
        {
            candidates = config.filter(fc => fc.kind === "element");
        }
        else
        {
            const fc = config.find(f => f.field === seg.target);
            candidates = fc ? [fc] : [];
        }

        // 按顺序尝试
        for (const fc of candidates)
        {
            // const raw = docRec[fc.field];
            const raw = doc[fc.field];
            if (raw === undefined || raw === null) continue;

            if (fc.kind === "str")
            {
                if (typeof raw !== "string") continue;

                const occ = ctx.occupiedStrings.get(fc.field)
                    ?? new Array<boolean>(raw.length).fill(false);

                const m = SearchCoreContribution.matchInString(seg.text, raw, occ, fc.canOccupy === true);
                if (m)
                {
                    if (fc.canOccupy)
                    {
                        occ.fill(true);   // 锁整串
                    }
                    else
                    {
                        for (let j = m.start; j < m.end; j++) occ[j] = true;
                    }
                    ctx.occupiedStrings.set(fc.field, occ);

                    return {
                        fieldName: fc.field,
                        kind: "str",
                        index: m.start,
                        score: m.score,
                    };
                }
            }
            else
            {
                if (!Array.isArray(raw)) continue;

                const occ = ctx.occupiedArrays.get(fc.field) ?? new Set<number>();
                const m = SearchCoreContribution.matchInArray(seg.text, raw, occ);
                if (m)
                {
                    occ.add(m.index);
                    ctx.occupiedArrays.set(fc.field, occ);

                    return {
                        fieldName: fc.field,
                        kind: "element",
                        index: m.index,
                        score: m.score,
                    };
                }
            }
        }

        return null;
    }

    private static matchTitleGroup(
        group: Segment[],
        doc: SearchDocument,
        strFields: FieldConfig[],
        ctx: MatchContext,
    ): TitleGroupResult | null
    {
        // const docRec = doc as unknown as Record<string, unknown>;

        for (const fc of strFields)
        {
            // const raw = docRec[fc.field];
            const raw = doc[fc.field];
            if (typeof raw !== "string" || raw.length === 0) continue;

            // 用副本试匹配，全部成功才提交
            const occ = ctx.occupiedStrings.get(fc.field)
                ?? new Array<boolean>(raw.length).fill(false);
            const occCopy: boolean[] = occ.slice();

            const scores: number[] = [];
            let minStart: number = 0;
            let allSuccess: boolean = true;

            for (const sub of group)
            {
                const m = SearchCoreContribution.matchInStringFrom(
                    sub.text, raw, occCopy, fc.canOccupy === true, minStart
                );
                if (!m)
                {
                    allSuccess = false;
                    break;
                }

                scores.push(m.score);
                minStart = m.end;

                // 标记占用（先不锁整串）
                for (let j = m.start; j < m.end; j++) occCopy[j] = true;
            }

            if (allSuccess)
            {
                // 全部成功后处理 canOccupy
                if (fc.canOccupy)
                {
                    occCopy.fill(true);
                }
                ctx.occupiedStrings.set(fc.field, occCopy);
                return { fieldName: fc.field, scores };
            }
        }

        return null;
    }



    private static aggregate(
        doc: SearchDocument,
        strScores: Map<string, number>,
        arrayMatches: Map<string, Array<{ textLen: number; elementLen: number }>>,
        titleWeight: number,
        tagsWeight: number,
        otherWeight: number,
    ): MatchResult
    {
        // const docRec = doc as unknown as Record<string, unknown>;

        // title
        let titleScore: number = 0;
        if (strScores.has("title"))
        {
            const titleVal = doc.title;
            if (typeof titleVal === "string" && titleVal.length > 0)
            {
                titleScore = (strScores.get("title") ?? 0) / titleVal.length;
            }
        }

        // tags
        let tagsScore: number = 0;
        if (arrayMatches.has("tags"))
        {
            const tagsVal = doc.tags;
            if (Array.isArray(tagsVal) && tagsVal.length > 0)
            {
                const matches = arrayMatches.get("tags")!;
                let sum: number = 0;
                for (const m of matches) sum += m.textLen / m.elementLen;
                tagsScore = sum * C.SEARCH_TAG_WEIGHT_P;
            }
        }

        // 其他字段
        let otherScore: number = 0;

        for (const [field, score] of strScores)
        {
            if (field === "title") continue;
            const val = doc[field];
            if (typeof val === "string" && val.length > 0)
            {
                otherScore += (score / val.length) * otherWeight;
            }
        }

        for (const [field, matches] of arrayMatches)
        {
            if (field === "tags") continue;
            const val = doc[field];
            if (Array.isArray(val) && val.length > 0)
            {
                let sum: number = 0;
                for (const m of matches) sum += m.textLen / m.elementLen;
                otherScore += (sum) * otherWeight;
            }
        }

        const totalScore =
            titleScore * titleWeight +
            tagsScore * tagsWeight +
            otherScore;

        return { titleScore, tagsScore, totalScore };
    }

    private static matchDocument(
        doc: SearchDocument,
        segments: Segment[],
        config: FieldConfig[],
        titleWeight: number,
        tagsWeight: number,
        otherWeight: number,
    ): MatchResult
    {
        const mixedMode: boolean = segments.some(
            s => s.target !== C.SEARCH_KIND_STRING_NAME
        );

        const ctx: MatchContext = {
            occupiedStrings: new Map(),
            occupiedArrays: new Map(),
            mixedMode
        };

        const strScores: Map<string, number> = new Map();
        const arrayMatches: Map<string, Array<{ textLen: number; elementLen: number }>> = new Map();

        for (const seg of segments)
        {
            const m = SearchCoreContribution.matchSegment(seg, doc, config, ctx);
            if (!m) continue;

            if (m.kind === "str")
            {
                const prev = strScores.get(m.fieldName) ?? 0;
                strScores.set(m.fieldName, prev + m.score);
            }
            else
            {
                // const docRec = doc as unknown as Record<string, unknown>;
                const arr = doc[m.fieldName];
                if (!Array.isArray(arr)) continue;
                const element = arr[m.index];
                if (typeof element !== "string") continue;
                const list = arrayMatches.get(m.fieldName) ?? [];
                list.push({ textLen: m.score, elementLen: element.length });
                arrayMatches.set(m.fieldName, list);
            }
        }

        return SearchCoreContribution.aggregate(doc, strScores, arrayMatches, titleWeight, tagsWeight, otherWeight);
    }

    private static matchDocumentSplit(
        doc: SearchDocument,
        split: SplitQuery,
        config: FieldConfig[],
        titleWeight: number,
        tagsWeight: number,
        otherWeight: number,
    ): MatchResult
    {
        const mixedMode: boolean = split.tagSegments.length > 0;

        const ctx: MatchContext = {
            occupiedStrings: new Map(),
            occupiedArrays: new Map(),
            mixedMode
        };

        const strScores: Map<string, number> = new Map();
        const arrayMatches: Map<string, Array<{ textLen: number; elementLen: number }>> = new Map();

        const strFields = config.filter(fc => fc.kind === "str");

        // 1. title 组：顺序匹配
        for (const group of split.titleGroups)
        {
            const r = SearchCoreContribution.matchTitleGroup(group, doc, strFields, ctx);
            if (!r) continue;

            const prev = strScores.get(r.fieldName) ?? 0;
            let sum: number = 0;
            for (const s of r.scores) sum += s;
            strScores.set(r.fieldName, prev + sum);
        }

        // 2. tag 段：普通匹配
        for (const seg of split.tagSegments)
        {
            const m = SearchCoreContribution.matchSegment(seg, doc, config, ctx);
            if (!m) continue;

            if (m.kind === "str")
            {
                const prev = strScores.get(m.fieldName) ?? 0;
                strScores.set(m.fieldName, prev + m.score);
            }
            else
            {
                // const docRec = doc as unknown as Record<string, unknown>;
                const arr = doc[m.fieldName];
                if (!Array.isArray(arr)) continue;
                const element = arr[m.index];
                if (typeof element !== "string") continue;
                const list = arrayMatches.get(m.fieldName) ?? [];
                list.push({ textLen: m.score, elementLen: element.length });
                arrayMatches.set(m.fieldName, list);
            }
        }

        return SearchCoreContribution.aggregate(doc, strScores, arrayMatches, titleWeight, tagsWeight, otherWeight);
    }
}

export { SearchCoreContribution };