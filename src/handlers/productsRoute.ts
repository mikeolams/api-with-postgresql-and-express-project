import express, {Request, Response} from 'express'
import {Product, ProductStore} from '../models/product'
// import cors from 'cors'


// const corsOptions = {
// 	origin:'http://someotherdomain.com',
// 	optionsSuccessStatus: 200 //some legacy browsers (IE11,various)
// }


const store = new ProductStore()

const index = async (_req: Request, res:Response) => {
	const products = await store.index()
	res.json(products)
}

const show = async (req: Request, res: Response) => {
    const products = await store.show(req.params.id)
    res.json(products)
 }

 const topFive = async (req: Request, res: Response) => {
    const products = await store.showTopFive()
    res.json(products)
 }

 const showCategory = async (req: Request, res: Response) => {
    const products = await store.showCategory(req.params.category)
    res.json(products)
 }
 
 const create = async (req: Request, res: Response) => {
     try {
         const product: Product = {
             id: req.body.id,
             productName: req.body.productName,
             price:req.body.price,
             category: req.body.category,
         }
 
         const newProduct = await store.addProduct(product)
         res.json(newProduct)
     } catch(err) {
         res.status(400)
         res.json(err)
     }
 }
 
 

const product_routes = (app: express.Application) =>{
	app.get('/products', index)
    app.get('/products/:id', show)
    app.get('/products/topfive', topFive)
    app.get('/products/:category', showCategory)
    app.post('/products', create)
}

export default product_routes