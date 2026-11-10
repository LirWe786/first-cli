#!/usr/bin/env node

import { program } from 'commander'
import { select, input } from "@inquirer/prompts"
import process from 'node:process'
import { createFile, readFile, deleteFile } from './modules/crud.js'



process.on('uncaughtException', (error) => {
    if (error instanceof Error && error.name === 'ExitPromptError') {
        console.log('\n Программа экстренно закрыта пользователем')
        process.exit(0)
    } else {
        console.log(error)
        process.exit(1)
    }
})


program
    .name('my-cli')
    .description('моя первая cli ')
    .version('1.0.0')
    .action(async () => {
        main: while (true) {

            const choise = await select({
                message: ('Выберите оперицию:'),
                choices: [
                    { name: 'Создать новый файл', value: 'create' },
                    { name: 'Прочитать содержимое файла', value: 'read' },
                    { name: 'Удалить файл', value: 'delete' },
                    { name: 'Выход', value: "exit" }
                ],

            })

            switch (choise) {
                case 'create':
                    await createFile();
                    break;
                case "read":
                    await readFile();
                    break;
                case 'delete':
                    await deleteFile();
                    break;
                case 'exit':
                    break main;

            }



        }
    })




program.parse(process.argv);
