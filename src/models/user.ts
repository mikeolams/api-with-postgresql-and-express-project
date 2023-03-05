import Client from'../database'
// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


const saltRounds = process.env.SALT_ROUNDS
const pepper = process.env.BCRYPT_PASSWORD

export type User ={
// id?: string;
id: Number;
firstName:string;
lastName:string;
password:string;
// username:string
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

async create(u:User ): Promise<User> {
    try {
        // const sql = 'INSERT INTO users ( first_name, last_name, password) VALUES($1,$2,$3)'
        const sql = 'INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *'
        // const sql = 'INSERT INTO users (username, password_digest) VALUES($1, $2, $3) RETURNING *'
        //@ts-ignore
        const conn = await Client.connect()

        const hash = bcrypt.hashSync(
            u.password + pepper, 
            parseInt(saltRounds)
          );
        
        //   const result = await conn.query(sql, [u.username, hash])

        const result = await conn.query(sql, [u.firstName, u.lastName,hash])

        const user = result.rows[0]

        conn.release()

        return user
    
    }catch (err) {
        throw new Error (` Could not add user ${u.firstName}: ${err}`)
        }
    }

    async authenticate(u: User): Promise<User | null> {
        const username = u.firstName
        const conn = await Client.connect()
        const sql = 'SELECT password FROM users WHERE first_name=($1)'
    
        const result = await conn.query(sql, [username])
    
        console.log(u.password+pepper)
    
        if(result.rows.length) {
    
          const user = result.rows[0]
    
          console.log(user)
    
          if (bcrypt.compareSync(u.password+pepper, user.password)) {
            return user
          }
        //   if (bcrypt.compareSync(u.password+pepper, user.password_digest)) {
        //     return user
        //   }
        }
    
        return null
      }
    
}