import { entry as getWpQuestions } from "./get-data/get-wp-questions.ts"; 
import { entry as getWpCatalogs } from "./get-data/get-catalogs.ts"



async function main()
{
    for (const collectionName of ["CTF", "DF"])
    {
        console.log(`\n===== get ${collectionName} data:`);
        await getWpQuestions(collectionName);
        await getWpCatalogs(collectionName);
    }
}