import express, {Request, Response, NextFunction} from 'express'
import {Order, OrderStore} from '../models/order'
var jwt = require('jsonwebtoken');

const store = new OrderStore()

const index = async (req: Request, res:Response) => {

    const orderId: number = parseInt(req.params.id)
    const userId: number = parseInt(req.body.userId)
    const productId: number = parseInt(req.body.productId)
    const orderStatus: string = req.body.orderStatus
    const productQuantityOrder: number = parseInt(req.body.productQuantityOrder)


    try {
        const orders = await store.index(userId)
        res.json(orders)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}
   

const showCompleteOrder = async (req: Request, res: Response) => {
    const orderId: number = parseInt(req.params.id)
    const userId: number = parseInt(req.params.id)
    // const productId: number = parseInt(req.body.productId)

    const orders = await store.completeUserOrders(userId)
    res.json(orders)
 }

//  const create = async (req: Request, res: Response) => {
//     try {
//         const order: Order = {
//             id: req.body.id,
//             productId: req.body.productId,
//             userId:req.body.userId,
//             productQuantityOrder: req.body.productQuantityOrder,
//             orderStatus:req.body.orderStatus
//         }

//         const newOrder = await store.createOrder(order)
//         res.json(newOrder)
//     } catch(err) {
//         res.status(400)
//         res.json(err)
//     }
// }

const addOrder = async (req: Request, res: Response) => {
         try {
                const order: Order = {
                    id: parseInt(req.body.id),
                    productId: parseInt(req.body.productId),
                    userId:req.body.userId,
                    productQuantityOrder: req.body.productQuantityOrder,
                    orderStatus:req.body.orderStatus
                }
        
                const newOrder = await store.addOrder(order.productQuantityOrder,order.orderStatus, order.productId, order.userId,order.id )
                res.json(newOrder)
            } catch(err) {
                res.status(400)
                res.json(err)
            }
 }

 const verifyAuthToken = (req: Request, res: Response, next:NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization
          //@ts-ignore
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        if(decoded.id !== req.body.id) {
            throw new Error('User is not authorised for this action!')
        }

        next()
    } catch (error) {
        res.status(401)
    }
}

 
 

const order_routes = (app: express.Application) =>{
	app.get('/orders/user/:id',verifyAuthToken, index)
    app.get('/orders/:id',verifyAuthToken, showCompleteOrder)
    app.post('/orders',verifyAuthToken, addOrder)
    // app.post('/orders', create)
}

export default order_routes