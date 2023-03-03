import Client from'../database'

export type User ={
// id?: string;
id: Number;
firstName:string;
lastName:string;
password:string
}

export class UserStore {
async index(): Promise<User[]> {
    try {
            //@ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        }catch (err) {
            throw new Error (` Could not list users: ${err}`)}
        }

async show(id:string): Promise<User[]> {
    try {
            //@ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM users WHERE id=($1)'
            const result = await conn.query(sql,id)
            conn.release()
            return result.rows
        }catch (err) {
            throw new Error (` Could not list these users: ${err}`)}
        }

async create(firstName: string, lastName: string, password: string ): Promise<User> {
    try {
        const sql = 'INSERT INTO users ( first_name, last_name, password) VALUES($1,$2,$3)'
        //@ts-ignore
        const conn = await Client.connect()

        const result = await conn.query(sql, [firstName, lastName,password])

        const product = result.rows[0]

        conn.release()

        return product
    
    }catch (err) {
        throw new Error (` Could not add user ${firstName}: ${err}`)}
    }
    
}