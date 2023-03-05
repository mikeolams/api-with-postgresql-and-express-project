import express, {Request, Response} from 'express'
import {Order, OrderStore} from '../models/order'

const store = new OrderStore()

const index = async (req: Request, res:Response) => {

    const orderId: number = parseInt(req.params.id)
    const userId: number = parseInt(req.body.userId)
    const productId: number = parseInt(req.body.productId)
    const orderStatus: string = req.body.orderStatus
    const productQuantityOrder: number = parseInt(req.body.productQuantityOrder)


    try {
        const order: Order = {
            id: parseInt(req.params.id),
            productId: req.body.productId,
            userId:req.body.userId,
            productQuantityOrder: req.body.productQuantityOrder,
            orderStatus: req.body.orderStatus

        }

        const orders = await store.index(order.id)
        res.json(orders)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}
   

const showCompleteOrder = async (req: Request, res: Response) => {
    const orders = await store.completeUserOrders(req.params.id)
    res.json(orders)
 }

 
 

const order_routes = (app: express.Application) =>{
	app.get('/users', index)
    app.get('/users/:id', show)
    app.post('/products', create)
}

export default order_routes