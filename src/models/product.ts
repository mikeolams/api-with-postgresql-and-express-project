import Client from'../database'

export type Product ={
// id?: string;
id: Number;
productName:string;
price: number;
category: string;
}

export class ProductStore {
async index(): Promise<Product[]> {
    try {
            //@ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM products'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        }catch (err) {
            throw new Error (` Could not products: ${err}`)}
        }

async show(id:number): Promise<Product> {
    try {
            //@ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM users WHERE id=($1)'
            const result = await conn.query(sql,id)
            conn.release()
            return result.rows
        }catch (err) {
            throw new Error (` Could not products: ${err}`)}
        }

async showCategory(category:string): Promise<Product> {
    try {
            //@ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM products WHERE category=("active")'
            const result = await conn.query(sql,category)
                    conn.release()
            return result.rows
        }catch (err) {
            throw new Error (` Could not products: ${err}`)}
        }

async showTopFive(): Promise<Product> {
     try {
            //@ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM products ORDER BY category DESC LIMIT 5'
            const result = await conn.query(sql)
                    conn.release()
            return result.rows
        }catch (err) {
            throw new Error (` Could not products: ${err}`)}
        }

async addProduct(p:Product ): Promise<Product> {
    try {
        const sql = 'INSERT INTO products ( name, price, category) VALUES($1,$2,$3)'
        //@ts-ignore
        const conn = await Client.connect()

        const result = await conn.query(sql, [p.productName, p.price, p.category])

        const product = result.rows[0]

        conn.release()

        return product
    
    }catch (err) {
        throw new Error (` Could not add product ${p.productName}: ${err}`)}
    }
    
}