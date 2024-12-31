/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */
const http = require('node:http')

const server = http.createServer((request, response) => {
    const { method, statusCode, url } = request

    if (url === '/'){
        response.write("ola node")
        response.end()
    }
})

server.listen(3000, 'localhost', () => {
    console.log("Server rodando n http://localhost:3000");
});