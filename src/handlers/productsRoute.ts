import express, {Request, Response, NextFunction} from 'express'
import {Product, ProductStore} from '../models/product'
// import { app } from '../server';
// import cors from 'cors'
// import jwt from 'jsonwebtoken'
var jwt = require('jsonwebtoken');

// app
// const corsOptions = {
// 	origin:'http://someotherdomain.com',
// 	optionsSuccessStatus: 200 //some legacy browsers (IE11,various)
// }


const store = new ProductStore()

const index = async (_req: Request, res:Response) => {
    try {
        const products = await store.index()
        res.json(products)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const show = async (req: Request, res: Response) => {

    try {
        const id= parseInt(req.params.id)
        const products = await store.show(id)
        res.json(products)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
 }

 const topFive = async (req: Request, res: Response) => {
    try {
        const products = await store.showTopFive()
        res.json(products)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
 }

 const showCategory = async (req: Request, res: Response) => {
    try {
        const products = await store.showCategory(req.params.category)
        res.json(products)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
 }
 
 const create = async (req: Request, res: Response) => {
     try {
     
        const productName: string = req.body.productName
        const price: number = parseInt(req.body.price)
        const category: string = req.body.category
   
 
         const newProduct = await store.addProduct(productName,price,category)
         res.json(newProduct)
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
 
 
 

export const product_routes = (app: express.Application) =>{
    // app
	app.get('/products', index)
    app.get('/products/:id', show)
    app.get('/products/topfive', topFive)
    app.get('/products/:category', showCategory)
    app.post('/products',verifyAuthToken, create)
}

// export default product_routes