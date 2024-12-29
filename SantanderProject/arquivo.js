// eslint-disable-next-line @typescript-eslint/no-require-imports
const rl = require('readline')

const prompt = rl.createInterface({
    input: process.stdin,
    output: process.stdout
})

const promptPromise = {
    question : (pergunta) => new Promise((resolve, reject) =>{
        try {
            prompt.question((pergunta), (resposta) => resolve(resposta))
        } catch (error) {
            reject(error)
        }
    }),
    close : () => prompt.close()
}

async function askUser(){
    const numero = await promptPromise.question("Qual seu numero favorito? ")
    console.log(`O dobro do seu numero favorito é ${parseInt(numero) * 2}`)

    const animal = await promptPromise.question("Qual seu animal favorito? ")
    console.log(`O seu animal favorito é ${animal}`)

    promptPromise.close()
}

askUser()
