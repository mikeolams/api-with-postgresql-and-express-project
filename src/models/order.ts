import Client from'../database'

export type Order ={
// id?: string;
id: Number;
productId:number;
userId:number;
productQuantityOrder:number;
orderStatus:string
}

export class OrderStore {
async index(): Promise<Order[]> {
    try {
            //@ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM orders'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        }catch (err) {
            throw new Error (` Could not list orders: ${err}`)}
        }


    
}