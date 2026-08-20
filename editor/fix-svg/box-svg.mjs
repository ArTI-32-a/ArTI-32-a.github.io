import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const superDir = join(__dirname, '..', '..', 'src', 'assets', 'pictures');
const targetI = "background/wp"


function walk(target)
{
    const dir = join(superDir, target)
    const files = readdirSync(dir);

    for (const file of files)
    {
        const curr = join(dir, file); //当前正在遍历的路径
        const status = statSync(curr)

        if (status.isDirectory())
        {
            walk(curr);
        }
        else if (extname(curr) === '.svg')
        {
            process(curr);
        }
    }
}


function process(target)
{
    const content = readFileSync(target, 'utf8');

    let newContent = content;


    newContent = fixTag(target, content, "svg");
    newContent = fixTag(target, content, "image");
}


function fixTag(path, content, tagName)
{
    const regex = new RegExp(`<${tagName}([^>]*)>`, 'g');

    const original = content;

    const newContent = content.replace(regex, (match, attrs) => 
    {
        const hasPreserve = /preserveAspectRatio\s*=\s*["'][^"']*["']/.test(attrs);
        let newAttrs = attrs;

        if (hasPreserve)
        {
            newAttrs = newAttrs.replace(
                /preserveAspectRatio\s*=\s*["'][^"']*["']/,
                'preserveAspectRatio="xMinYMin slice"');
        }
        else
        {
            newAttrs = ' preserveAspectRatio="xMinYMin slice" ' + attrs;
        }

        return `<${tagName}${newAttrs}>`;
    });

    if (original !== newContent)
    {
        writeFileSync(path, newContent, 'utf8');
        console.log('fixed:', path);
    }
    else 
    {
        console.log('fix-passed:', path);
    }

    return newContent;
}



export function entry()
{
    walk(targetI)
}