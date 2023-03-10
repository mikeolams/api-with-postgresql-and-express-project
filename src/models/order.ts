import Client from'../database'

export type Order ={
// id?: string;
id: number;
// productId:number; //product id in the  specific order
userId:number;
// quantityOrder:number;
orderStatus:string
}

export type ProductOrder ={
    // id?: string;
    id: number;
    productId:number; //product id in the  specific order
    orderId:number;
    productQuantityOrder:number;
    }

export type ProductsInOrder =[]

export class OrderStore {

    async show(userId:number): Promise<ProductOrder> {
        const getUserOrderId = () =>{
                //@ts-ignore
                const connServer = Client.connect()
                const sql = 'SELECT id FROM order WHERE user_id=($1) ORDER BY id DESC LIMIT 1'
                const result = connServer.query(sql,userId)
                connServer.release()
                const orderId = result.rows
                return orderId
        }
        // type orderId:string;

        return getUserOrderId().then((orderId:string) =>{
             
                     //@ts-ignore
                     const connServer = Client.connect()
                     const sql = 'SELECT * FROM order_products WHERE order_id=($1) ORDER BY order_id DESC LIMIT 1'
                     const result = connServer.query(sql,parseInt(orderId))
                     connServer.release()
                     // order = result.rows
                     const userCurrentOrder:ProductOrder = result.rows
               
               return userCurrentOrder

        }).catch ((err:unknown) =>  (` Could not process this request: ${err}`)
        ) 

    //     // try {
    //     //     //@ts-ignore
    //     //     const conn = await Client.connect()
    //     //     let userCurrentOrder:undefined
    //     //     // const userCurrentOrder:ProductOrder = []
    //     //     // let  order=[];
            
    //     //     const sql = 'SELECT id FROM order WHERE user_id=($1) ORDER BY id DESC LIMIT 1'
    //     //     const result = await conn.query(sql,userId)
    //     //     conn.release()
    //     //     const orderId = result.rows

    //     //     if (orderId !== null) {
    //     //         try {
    //     //             //@ts-ignore
    //     //             const conn = await Client.connect()
    //     //             const sql = 'SELECT * FROM order_products WHERE order_id=($1) ORDER BY order_id DESC LIMIT 1'
    //     //             const result = await conn.query(sql,orderId)
    //     //             conn.release()
    //     //             // order = result.rows
    //     //             userCurrentOrder = result.rows
    //     //         }catch (err) {
    //     //             throw new Error (` Could not list current orders: ${err}`)
    //     //         }
    //     //       }
    //     //     //   const userCurrentOrder:ProductOrder = order
    //     //       return userCurrentOrder

    //     // }catch (err) {
    //     //     throw new Error (` Could not find user id: ${err}`)
    //     // }

            }

            async completeUserOrders(userId:number): Promise<ProductsInOrder> {
                const getCompleteOrder = () =>{
                        //@ts-ignore
                        const connServer = Client.connect()
                        const sql = 'SELECT id FROM order WHERE user_id=($1)'
                        const result = connServer.query(sql,userId)
                        connServer.release()
                        const orderIds = result.rows
                        return orderIds
                }
              
        
                return getCompleteOrder().then((orderIds:ProductsInOrder) =>{
                     
                    orderIds.forEach( orderId => { 
                        const userAllOrders:ProductsInOrder =[]
                        //@ts-ignore
                        const connServer = Client.connect()
                        const sql = 'SELECT * FROM order_products WHERE user_id=($1)'
                        const result = connServer.query(sql,parseInt(orderId))
                        connServer.release()
                        // @ts-ignore
                        userAllOrders.push(JSON.parse(result.rows)) 
                        // userAllOrders.push(JSON.parse(result.rows)) 
                        // const userAllOrders:ProductsInOrder = result.rows
                       //  const userCurrentOrder:ProductOrder = result.rows
//                    userAllOrders.push(result.rows) JSON.parse()
                  
                  return userAllOrders
                    });
                             
        
                }).catch ((err:unknown) =>  (` Could not process this request: ${err}`)
                ) 
        
                    }
    
    // async completeUserOrders(userId:number): Promise<ProductsInOrder> {
    //     try {
    //         //@ts-ignore
    //         const connServer = await Client.connect()
    //         const userOrders:ProductsInOrder = [];
    //         // let userOrders:Array<A> ;
    //         const sql = 'SELECT id FROM order WHERE user_id=($1)'
    //         const result = await connServer.query(sql,userId)
    //         connServer.release()
    //         const ordersId:string[] = result.rows

    //         if (ordersId !== null) {
    //             ordersId.forEach( orderId => { });
    //                 try {
    //                     //@ts-ignore
    //                    const connServer = await Client.connect()
    //                    const sql = 'SELECT * FROM order_products WHERE user_id=($1)'
    //                    const result = connServer.query(sql,orderId)
    //                    connServer.release()
    //                    userOrders.push(result.rows) 
    //                }catch (err) {
    //                    throw new Error (` Could not list orders: ${err}`)
    //                }
    //             });
    //           }

    //           return userOrders

    //     }catch (err) {
    //         throw new Error (` Could not find user id: ${err}`)
    //     }

    //         }
    
    
    async addProductOrder(orderId:number,productId:number, productQuantityOrder:number ): Promise<ProductOrder> {
    
              // get order to see if it is active
              try {
                const ordersql = 'SELECT * FROM orders WHERE id=($1)'
                //@ts-ignore
                const connServer = await Client.connect()
          
                const result = await connServer.query(ordersql, [orderId])
          
                const order = result.rows[0]
          
                if (order.orderStatus !== "active") {
                  throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`)
                }
          
                connServer.release()
              } catch (err) {
                throw new Error(`${err}`)
              }
    
        try {
            const sql = 'INSERT INTO order_products ( order_Id, product_id, product_quantity_order) VALUES($1,$2,$3)'
            //@ts-ignore
            const connServer = await Client.connect()
            
            const result = await connServer.query(sql, [orderId, productId, productQuantityOrder])
            
            const productsOrder:ProductOrder = result.rows[0]
            
            connServer.release()
            
            return productsOrder
                
        }catch (err) {
            throw new Error (` Could not add ordered product for product id ${productId}: ${err}`)
        }    
        
        }

async index(): Promise<Order[]> {
    try {
            //@ts-ignore
            const connServer = await Client.connect()
            const sql = 'SELECT * FROM orders'
            const result = await connServer.query(sql)
            connServer.release()
            return result.rows
        }catch (err) {
            throw new Error (` Could not list orders: ${err}`)}
        }

async createOrder(O:Order ): Promise<Order> {
    try {
        const sql = 'INSERT INTO orders ( user_id, order_status) VALUES($1,$2)'
        //@ts-ignore
        const connServer = await Client.connect()
                
        const result = await connServer.query(sql, [ O.userId, O.orderStatus])
                
        const order = result.rows[0]
                
        connServer.release()
                
        return order
                    
    }catch (err) {
        throw new Error (` Could not create order ${O.id}: ${err}`)
    }}

}