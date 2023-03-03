import express, {Request, Response} from 'express'
import {User, UserStore} from '../models/user'

const store = new UserStore()

const index = async (_req: Request, res:Response) => {
	const users = await store.index()
	res.json(users)
}

const show = async (req: Request, res: Response) => {
    const users = await store.show(req.params.id)
    res.json(users)
 }

 
 const create = async (req: Request, res: Response) => {
     try {
         const user: User = {
             id: req.body.id,
             firstName: req.body.firstName,
             lastName:req.body.lastName,
             password: req.body.password
         }
 
         const newUser = await store.create(user)
         res.json(newUser)
     } catch(err) {
         res.status(400)
         res.json(err)
     }
 }
 
 

const user_routes = (app: express.Application) =>{
	app.get('/users', index)
    app.get('/users/:id', show)
    app.post('/products', create)
}

export default user_routes