/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { request } from "express";
import { config } from "dotenv";
import { randomUUID } from "crypto";
import dbJson from "./server.json"
import path from "path";
import { writeFileSync } from "fs";

type User = {
    id: string
    name: string
    age: number
}

type CreateUserDTO = Omit<User, "id">

config()
const app = express()
app.use(express.json());
const port = process.env.API_PORT ?? 3300
const url = process.env.API_BASE_URL ?? 'http://localhost'
const dbJsonPath = path.resolve(process.cwd(), 'server.json')

const users: User[] = dbJson.users

app.post('/api/users', (request, response) => {
    const {name, age}: CreateUserDTO = request.body

    if(!name || age < 0){
        response.status(400).send('O usuario precisa de nome e idade')
    }
    
    const user = { id: randomUUID(), name, age }

    users.push(user)

    writeFileSync(dbJsonPath, JSON.stringify(users))

    response.status(201).json(user)
})

app.get('/', (request, response) => {
    response.json(users);
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${url}:${port}`)
})