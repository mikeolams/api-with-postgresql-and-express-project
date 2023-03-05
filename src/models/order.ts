import Client from'../database'

export type Order ={
// id?: string;
id: number;
productId:number;
userId:number;
productQuantityOrder:number;
orderStatus:string
}

export class OrderStore {
async index(userId:number): Promise<Order[]> {
    try {
            //@ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT order_status FROM orders WHERE user_id=($1)'
            const result = await conn.query(sql,userId)
            conn.release()
            return result.rows
        }catch (err) {
            throw new Error (` Could not list orders: ${err}`)}
        }

async completeUserOrders(userId:Number): Promise<Order[]> {
    try {
             //@ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM orders WHERE user_id=($1)'
            const result = await conn.query(sql,userId)
            conn.release()
            return result.rows
        }catch (err) {
            throw new Error (` Could not list orders: ${err}`)}
        }

async createOrder(O:Order ): Promise<Order[]> {
    try {
        const sql = 'INSERT INTO orders ( product_id, product_quantity_order, order_status, user_id) VALUES($1,$2,$3,$4)'
        //@ts-ignore
        const conn = await Client.connect()
                
        const result = await conn.query(sql, [O.productId, O.productQuantityOrder, O.orderStatus, O.userId])
                
        const order = result.rows[0]
                
        conn.release()
                
        return order
                    
    }catch (err) {
        throw new Error (` Could not create order ${O.id}: ${err}`)}
    }

async addOrder(productQuantityOrder:number, orderStatus:string, productId:number, userId:number, orderId:number ): Promise<Order[]> {

          // get order to see if it is active
          try {
            const ordersql = 'SELECT * FROM orders WHERE id=($1)'
            //@ts-ignore
            const conn = await Client.connect()
      
            const result = await conn.query(ordersql, [orderId])
      
            const order = result.rows[0]
      
            if (order.orderStatus !== "active") {
              throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`)
            }
      
            conn.release()
          } catch (err) {
            throw new Error(`${err}`)
          }

    try {
        const sql = 'INSERT INTO orders ( product_quantity_order, order_status, product_id, user_id) VALUES($1,$2,$3)'
        //@ts-ignore
        const conn = await Client.connect()
        
        const result = await conn.query(sql, [productQuantityOrder, orderStatus,productId, userId])
        
        const order = result.rows[0]
        
        conn.release()
        
        return order
            
    }catch (err) {
        throw new Error (` Could not add order ${userId}: ${err}`)
    }    
    
    }
    
}