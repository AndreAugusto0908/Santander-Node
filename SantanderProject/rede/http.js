/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */
const http = require('node:http')
const sports = ['futebol', 'volei', 'basquete', 'tenis']

const server = http.createServer(async(request, response) => {
    const { method, statusCode, url } = request

    const bodyPromise = new Promise((resolve, reject) => {
        let body
        request.on('data', data => {
            body = JSON.parse(data)
        })

        request.on('end', () => {
            resolve(body)
        });
    });

    if (url === '/'){
        response.write('<div><h1>Hello from node<h1/><p>Deda</p><div/>')
        response.end()
        return
    }

    if(url === '/api/sports'){
        if(method === 'GET'){
            response.write(JSON.stringify(sports))
            response.end()
            return
        }

        if(method === 'POST'){
            const body = await bodyPromise
            
            const { name } = body

            if(!sports.map(sport => sport.toLowerCase()).includes(name.toLowerCase())){
                sports.push(name.toLowerCase())
            }

            response.write(JSON.stringify(name))
            response.end()
            return
        }
    }

    response.statusCode = 404
    response.write("<h1>Pagina não enconrtada</h1>")
    response.end()
})

server.listen(3000, 'localhost', () => {
    console.log("Server rodando n http://localhost:3000");
});