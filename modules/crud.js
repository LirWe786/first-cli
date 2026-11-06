import { select, input, confirm } from "@inquirer/prompts";
import { program } from "commander";
import fs from 'node:fs/promises';
import path from "node:path";


const currentDir = process.cwd();


export async function createFile() {
    try {


        let fileData = ''

        const fileName = await input({
            message: 'Напишите название файла (с разширением)',
            default: 'new file',
            validate: (value) => {
                if (value.trim() === '') {
                    console.log("!!!заполните поле!!!")
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



