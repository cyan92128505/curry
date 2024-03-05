import fs from 'fs-extra';
import path from 'path';
import schema from './birth_preferences.schema.json' assert { type: "json" };
import data from './birth_preferences.data.json' assert { type: "json" };



async function readTemplate() {
    return await fs.readFile(path.join(process.cwd(), 'birth_preferences.template.md'), {
        encoding: 'utf8'
    });
}


/**
 * 
 * @param {String} markdown 
 */
async function applyData(markdown) {
    var _md = markdown;
    for (const key of Object.keys(schema)) {
        _md = _md.replace(`{{{${key}}}}`, data[key]);
    }

    return _md;
}

/**
 * 
 * @param {String} markdown 
 */
async function generateMarkdown(markdown) {
    try {
        await fs.writeFile('build.md', markdown);
        return 'Process Success'
    } catch (error) {
        return error;
    }
}

async function main() {
    let rawMd = await readTemplate();
    let processMd = await applyData(rawMd);
    let result = await generateMarkdown(processMd);
    console.log(result);
}

main();