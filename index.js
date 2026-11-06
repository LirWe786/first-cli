#!/usr/bin/env node

import { program } from 'commander'
import process from 'node:process'
import fs from 'node:fs/promises'
import path from 'node:path'



const currentDir = process.cwd();

program
    .name('my-cli')
    .description('моя первая cli ')
    .version('1.0.0')

program
    .command('createFile')
    .argument('<filename>', 'имя файла')

    .argument('[content]', 'содержимое файла')
    .action(async (filename, content) => {
        console.log(`file ${filename} creating...`);

        try {


            const filepath = path.join(currentDir, `${filename}`)
            console.log(content);
            await fs.writeFile(filepath, content || '', 'utf-8', (error) => {
                console.log('ошибка записи файла')
                throw new Error(error.message)
            })

        } catch (error) {
            console.log('ошибка записи файла')
            throw new Error(error.message)
        }
    })

program
    .command('readFile')
    .argument('<filename>', 'имя читаемого файла')
    .action(async (filename) => {

        let data;

        try {
            const filePath = path.join(currentDir, filename)
            data = await fs.readFile(filePath, 'utf-8', (error) => {
                console.log('Ошибка чтения файла');
                throw new Error(error.message)
            })
        }
        catch (error) {
            throw new Error(error.message)
        }
        console.log(data)
    })

program.parse(process.argv);
