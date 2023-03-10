import express, {Request, Response, NextFunction} from 'express'
import {Order, OrderStore} from '../models/order'
var jwt = require('jsonwebtoken');

const store = new OrderStore()

const show = async (req: Request, res:Response) => {

    const orderId: number = parseInt(req.params.id)
    const userId: number = parseInt(req.body.userId)
    const productId: number = parseInt(req.body.productId)
    const orderStatus: string = req.body.orderStatus
    const productQuantityOrder: number = parseInt(req.body.productQuantityOrder)


    try {
        const orderedProducts = await store.show(userId)
        res.json(orderedProducts)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const index = async (_req: Request, res:Response) => {
    try {
        const orders = await store.index()
        res.json(orders)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}
   

const showCompleteOrder = async (req: Request, res: Response) => {
    // const orderId: number = parseInt(req.params.id)
    const userId: number = parseInt(req.params.id)

    const userOrders = await store.completeUserOrders(userId)
    res.json(userOrders)
 }

 const create = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            id: req.body.id,
            userId:req.body.userId,
            // quantityOrder: req.body.quantityOrder,
            orderStatus:req.body.orderStatus
        }

        const newOrder = await store.createOrder(order)
        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const addOrder = async (req: Request, res: Response) => {
         try {

            const orderId: number = parseInt(req.body.id)
            const productId: number = parseInt(req.body.productId)
            const productQuantityOrder: number = parseInt(req.body.productQuantityOrder)

        
                const newProductOrder = await store.addProductOrder(orderId,productId,productQuantityOrder )
                res.json(newProductOrder)
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

 
 

export const order_routes = (app: express.Application) =>{
	app.get('/orders/',verifyAuthToken, index)
	app.get('/orders/product/user/:id',verifyAuthToken, show)
    app.get('/orders/products/user/:id',verifyAuthToken, showCompleteOrder)
    app.post('/orders',verifyAuthToken, create)
    app.post('/orders/products',verifyAuthToken, addOrder)
}

// const order_routes = (app: express.Application) =>{
// 	app.get('/orders/', index)
// 	app.get('/orders/product/user/:id', show)
//     app.get('/orders/products/user/:id', showCompleteOrder)
//     app.post('/orders', create)
//     app.post('/orders/products', addOrder)
// }



// export default order_routes