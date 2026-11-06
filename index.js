#!/usr/bin/env node

import { program } from 'commander'
import { select, input } from "@inquirer/prompts"
import process from 'node:process'
import { createFile } from './modules/crud.js'






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
                    // await
                    console.log("Извините, это пока в разработке :(")
                    break main;
                case 'delete':
                    // await
                    break main;
                case 'exit':
                    break main;

            }



        }
    })




// program
//     .command('createFile')
//     .argument('<filename>', 'имя файла')

//     .argument('[content]', 'содержимое файла')
//     .action(async (filename, content) => {
//         console.log(`file ${filename} creating...`);

//         try {


//             const filepath = path.join(currentDir, `${filename}`)
//             console.log(content);
//             await fs.writeFile(filepath, content || '', 'utf-8')

//         } catch (error) {
//             console.log('ошибка записи файла')
//             throw new Error(error.message)
//         }
//     })

// program
//     .command('readFile')
//     .argument('<filename>', 'имя читаемого файла')
//     .action(async (filename) => {

//         let data;

//         try {
//             const filePath = path.join(currentDir, filename)
//             data = await fs.readFile(filePath, 'utf-8')
//         }
//         catch (error) {
//             throw new Error(error.message)
//         }
//         console.log(data)
//     })

// program
//     .command('deleteFile')
//     .argument('<filename>', 'имя удаляемого файла')
//     .action(async (filename) => {

//         console.log('Файл удаляется...')

//         try {
//             const filePath = path.join(currentDir, filename);
//             await fs.unlink(filePath)

//         } catch (error) {
//             throw new Error(error)
//         }


//     })


program.parse(process.argv);
