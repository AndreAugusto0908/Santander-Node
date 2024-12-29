/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('node:path')
const fs = require('node:fs')
const filePath = path.join(process.cwd(), 'Arquivo.txt')
const fileOutPath = path.join(process.cwd(), "TextoComLinhas.txt")

console.time('manipular arquivo')

fs.readFile(filePath, {}, (erro, dados) =>{
    if(erro){
        console.log(`Erro na leitura do arquivo caminho ${erro}`)
        return
    }
    const texto = dados.toString()
    const linhas = texto.split('\n')

    const linhasAjustadas = linhas.map((Linha, index, arrayDeLinhas) => (`${index + 1} - ${Linha}`))

    fs.writeFile(fileOutPath, linhasAjustadas.join('\n'), {}, (erro) => {
        if(erro){
            console.log(`Erro na escrita do arquivo na pesquisa ${fileOutPath}`)
        }
    })

    console.timeEnd('manipular arquivo')
})
