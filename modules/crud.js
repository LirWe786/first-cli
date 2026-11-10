import { select, input, confirm } from "@inquirer/prompts";

import fs from 'node:fs/promises';
import path from "node:path";




const currentDir = process.cwd();
// const pathToLog = path.join(currentDir, '../logs/logs.txt')
// const date = new Date()


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

async function toMakeChoiseListOrHandle(text, choiseWay, currentFile) {
    if (choiseWay == 'list') {
        const dirList = await createFilesList()
        currentFile = await select({
            message: 'Выберите файл: ',
            choices: dirList,
            default: dirList[0]
        })
    }
    if (choiseWay == 'handle') {
        currentFile = await input({
            message: `Какой файл вы хотите ${text}?`,
            default: '',
            validate: (value) => {
                if (value.trim() === '') {
                    console.warn("\n !!!Заполните поле!!!")
                    return false
                }
                return true
            }
        })
    }
}



export async function createFile() {
    try {

        let fileData = ''

        const fileName = await input({
            message: 'Напишите название файла (с разширением)',
            default: '',
            validate: (value) => {
                if (value.trim() === '') {
                    console.warn("!!!Заполните поле!!!");
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
            message: '\n Выберите из списка доступных файлов или введите название файла: ',
            choices: [
                { name: 'Список файлов', value: 'list' },
                { name: 'Ручной ввод', value: 'handle' }
            ],
            default: 'handle',
        })

        let currentFile = '';

        await toMakeChoiseListOrHandle('прочитать', choiseWay);

        const filePath = path.join(currentDir, currentFile)
        const fileData = await fs.readFile(filePath, "utf-8")
        console.log('Чтение файла завершенно: ')
        console.log(fileData)


    } catch (error) {
        console.log("Ошибка создания файла:", error)
        // await fs.appendFile(pathToLog, `\n  ${error}`, "utf-8")
    }
}

export async function deleteFiles(params) {
    try {
        let choiseWay = await select({
            message: '\n Выберите из списков доступных файлов или введите название файла:',
            choices: [
                { name: 'Список файлов', value: 'list' },
                { name: 'Ручной ввод', value: 'handle' }
            ],
            default: 'handle'
        })
        console.log('choiseWay')
        let currentFile = '';

        await toMakeChoiseListOrHandle('удалить', choiseWay, currentFile);

        const filePath = path.join(currentDir, currentFile);

        const isAgree = await confirm({
            message: `\n ПРЕДУПРЕЖДЕНИЕ: Вы уверены чо хотите удалить файл по пути: ${filePath}? \n Изменения будут необратимы! `,
            default: false,

        })

        if (isAgree === true) {
            await fs.unlink(filePath);
            console.log(`\n Файл по пути ${filePath} успешно удалён`);
            return true
        } else {
            console.log('\n Удаление файла отменено')
            return false
        }


    } catch (error) {


        if (error.code === 'EBUSY') {
            console.log('\n Ошибка удаления файла: файл занят или недоступен ')
        } else {
            console.log('\n Ошибка чтения удаления файла: ',  error)
        }
    }
}