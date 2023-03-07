// import dotenv from dotenv
var dotenv = require('dotenv');
import {Pool} from 'pg'

dotenv.config()
let client:Object;

const {
 POSTGRES_HOST, 
 POSTGRES_DB,
 POSTGRES_TEST_DB, 
 POSTGRES_USER,
 POSTGRES_PASSWORD,
 ENV
} =process.env

console.log(ENV)

if(ENV==='dev'){
 client = new Pool({
host:POSTGRES_HOST,
database:POSTGRES_DB,
user:POSTGRES_USER,
password:POSTGRES_PASSWORD,
})
}

if(ENV==='test'){
 client = new Pool({
    host:POSTGRES_HOST,
    database:POSTGRES_TEST_DB,
    user:POSTGRES_USER,
    password:POSTGRES_PASSWORD,
    })
}

 //@ts-ignore
export default client