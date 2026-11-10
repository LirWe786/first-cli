import { select, input, confirm } from "@inquirer/prompts";

import fs from 'node:fs/promises';
import path from "node:path";


const currentDir = process.cwd();
const pathToLog = path.join(currentDir, '../logs/logs.txt')
const date = new Date()


async function createFilesList() {

    try {
        const list = await fs.readdir(currentDir);
        const filteredList = list.filter((i) => i.split('.').length >= 2)
        return filteredList;
    } catch (error) {
        console.log("Ошибка чтения папки: ", error.message)
        // await fs.appendFile(pathToLog, `\n Error on createFilesList ${error}`, "utf-8");
    }

}

export async function createFile() {
    try {
        // await fs.appendFile(pathToLog, `\n \n starting func createFile} \n time:${date.getTime()} `, "utf-8")

        let fileData = ''

        const fileName = await input({
            message: 'Напишите название файла (с разширением)',
            default: 'new file',
            validate: (value) => {
                if (value.trim() === '') {
                    console.log("!!!Заполните поле!!!");
                    return false
                }
                return true
            }
        })
        const isData = await confirm({
            message: 'В новом файле будет содержимое?',
            default: true,
        })

        if (isData) {
            fileData = await input({
                message: 'Введите содержимое будущего файла: ',
                default: ''
            })
        }
        const filePath = path.join(currentDir, fileName)
        await fs.writeFile(filePath, fileData || '', "utf-8")

        console.log(`Файл ${fileName} успешно создан!`);

        return true
    } catch (error) {
        console.log("Ошибка создания файла:", error.message)
    }
}



export async function readFile(params) {


    try {
        // await fs.appendFile(pathToLog, `\n \n starting func readFile} \n time:${date.getTime()} `, "utf-8")
        const choiseWay = await select({
            message: 'Выберите из списка доступных файлов или введите название сами: ',
            choices: [
                { name: 'Список файлов', value: 'list' },
                { name: 'Ручной ввод', value: 'handle' }
            ],
            default: 'handle',
        })

        let currentFile = '';

        if (choiseWay == 'list') {
            // await fs.appendFile(pathToLog, `\n choise is list, if started  time:${date.getTime()} `, "utf-8")
            const dirList = await createFilesList()
            currentFile = await select({
                message: 'Выберите файл: ',
                choices: dirList,
                default: dirList[0]
            })
        }
        if (choiseWay == 'handle') {
            currentFile = await input({
                message: 'Какой файл вы хотите прочитать?',
                default: '',
                validate: (value) => {
                    if (value.trim() === '') {
                        console.log("!!!Заполните поле!!!")
                        return false
                    }
                    return true
                }
            })
        }

        const filePath = path.join(currentDir, currentFile)
        const fileData = await fs.readFile(filePath, "utf-8")
        console.log('Чтение файла завершенно: ')
        console.log(fileData)


    } catch (error) {
        console.log("Ошибка создания файла:", error)
        // await fs.appendFile(pathToLog, `\n  ${error}`, "utf-8")
    }
}

