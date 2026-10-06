import { SearchCoreContribution as SCC} from "./CoreContribution";
import { Common as C } from "@/utils/Common/Common";

import type { FieldConfig, SearchDocument, SearchResult, MatchResult } from "./CoreContribution";

let _config: FieldConfig[] = [];
let _getDocs: () => SearchDocument[] = () => [];

export function importConfig(config: FieldConfig[]): void
{
    _config = config;
}

export function importDocs(getter: () => SearchDocument[]): void
{
    _getDocs = getter;
}

export function search(query: string, includeDraft: boolean = false, filterZero: boolean = false,): Record<string, MatchResult>
{
    const config = _config;
    const allDocs = _getDocs();
    const docs = includeDraft
        ? allDocs
        : allDocs.filter(d => d.status !== "draft");

    // 1. 普通模式
    let results = SCC.runNormal(query, config, docs, C.SEARCH_TITLE_WEIGHT_P, C.SEARCH_TAGS_WEIGHT_P, C.SEARCH_OTHER_WEIGHT_P);

    // 2. 找最高分
    let maxNormal = 0;
    for (const r of results)
    {
        if (r.score.totalScore > maxNormal) maxNormal = r.score.totalScore;
    }

    // 3. 拆分模式（若需要）
    if (maxNormal < C.SEARCH_THRESHOLD_P)
    {
        const splitResults = SCC.runSplit(query, config, docs, C.SEARCH_TITLE_WEIGHT_P,C.SEARCH_TAGS_WEIGHT_P, C.SEARCH_OTHER_WEIGHT_P);

        let maxSplit = 0;
        for (const r of splitResults)
        {
            if (r.score.totalScore > maxSplit) maxSplit = r.score.totalScore;
        }

        if (maxSplit > maxNormal)
        {
            results = splitResults;
        }
    }

    // 4. 排序
    results.sort(sortResults);

    // 5. 转 Record
    const out: Record<string, MatchResult> = {};
    for (const r of results)
    {
        if (filterZero && r.score.totalScore <= 0) continue;
        out[r.doc.href] = r.score;
    }
    return out;
}

export function sortResults(a: SearchResult, b: SearchResult): number
{
    // 1. totalScore 降序
    if (a.score.totalScore !== b.score.totalScore)
    {
        return b.score.totalScore - a.score.totalScore;
    }

    // 2. 有 pubDate 的在前
    const aHas = a.doc.pubDate instanceof Date;
    const bHas = b.doc.pubDate instanceof Date;
    if (aHas && !bHas) return -1;
    if (!aHas && bHas) return 1;

    // 3. 都有 pubDate：时间靠后在前
    if (aHas && bHas)
    {
        return b.doc.pubDate!.getTime() - a.doc.pubDate!.getTime();
    }

    // 4. 都没有：保持原序
    return 0;
}