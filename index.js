#!/usr/bin/env node

import { program } from 'commander'
import process from 'node:process'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'url';


const currentDir = process.cwd();

program
    .name('my-cli')
    .description('моя первая cli ')
    .version('1.0.0')

program
    .command('create_file')
    .argument('<filename>', 'имя файла')

    .argument('[content]', 'содержимое файла')
    .action(async (filename, content) => {
        console.log(`file ${filename} creating...`);

        try {


            const filepath = path.join(currentDir, `${filename}`)
            console.log(filepath);
            await fs.writeFile(filepath, content, 'utf-8', (error) => {
                console.log('ошибка записи файла')
                throw new Error(error)
            })

        } catch (error) {
            console.log('ошибка записи файла')
            throw new Error(error)
        }
    })

program.parse(process.argv);
