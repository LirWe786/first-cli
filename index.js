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

program
    .command('readFile')
    .argument('<filename>', 'имя читаемого файла')
    .action(async (filename) => {

        let data;

        try {
            const filePath = path.join(currentDir, filename)
            data = await fs.readFile(filePath, 'utf-8', (error) => {
                console.log('Ошибка чтения файла');
                throw new Error(error)
            })
        }
        catch (error) {
            throw new Error(error)
        }
        console.log(data)
    })

program.parse(process.argv);
