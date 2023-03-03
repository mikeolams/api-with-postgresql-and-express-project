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
async index(u:Order): Promise<Order[]> {
    try {
            //@ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT order_status FROM orders WHERE user_id=($1)'
            const result = await conn.query(sql,u.orderStatus,u.userId)
            conn.release()
            return result.rows
        }catch (err) {
            throw new Error (` Could not list orders: ${err}`)}
        }

async completeUserOrders(u:Order): Promise<Order[]> {
    try {
             //@ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM orders WHERE user_id=($1)'
            const result = await conn.query(sql,u.userId)
            conn.release()
            return result.rows
        }catch (err) {
            throw new Error (` Could not list orders: ${err}`)}
        }
    
}