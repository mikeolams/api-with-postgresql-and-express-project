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

async show(id:number): Promise<Product[]> {
    try {
            //@ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM products WHERE id=($1)'
            const result = await conn.query(sql,[id])
            conn.release()
            return result.rows
        }catch (err) {
            throw new Error (` Could not list the required product: ${err}`)}
        }

async showCategory(category:string): Promise<Product[]> {
    try {
            //@ts-ignore
            const conn = await Client.connect()
            // const checkSql = 'SELECT * FROM products'
            // const checkResult = await conn.query(checkSql)
            // if (checkResult=== undefined ){
            //     // const result = "Product has not being created"
            //     // return checkResult
            //     console.log(checkResult)
            //     throw new Error (` Product has not being created: ${checkResult}`)
            // }else{
                const sql = 'SELECT * FROM products WHERE category LIKE "active"'
                const result = await conn.query(sql,[category])
                console.log(result.Result.rows)
                conn.release()
                return result.rows
            // }
          
        }catch (err) {
            throw new Error (` Could not list products category required because: ${err}`)}
        }

async showTopFive(): Promise<Product[]> {
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

async addProduct(productName:string, price:number, category:string ): Promise<Product> {
    try {
        const sql = 'INSERT INTO products ( name, price, category) VALUES($1,$2,$3)'
        //@ts-ignore
        const conn = await Client.connect()

        const result = await conn.query(sql, [productName, price, category])

        const product:Product = result.rows[0]

        conn.release()

        return product
    
    }catch (err) {
        throw new Error (` Could not add product ${productName}: ${err}`)}
    }
    
}