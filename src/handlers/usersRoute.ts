import express, {Request, Response, NextFunction } from 'express'
import {User, UserStore} from '../models/user'
// import { app } from '../server';
// import jwt from 'jsonwebtoken'
var jwt = require('jsonwebtoken');

// const app:express.Application = require('express')();

// const app: express.Application = express()
const store = new UserStore()

const index = async (_req: Request, res:Response) => {
	const users = await store.index()
	res.json(users)
}

const show = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const users = await store.show(id)
    res.json(users)
 }

 
 const create = async (req: Request, res: Response) => {
     try {
            const firstName: string = req.body.firstName
            const lastName: string =req.body.lastName
            const password: string = req.body.password    
 
         const newUser = await store.create(firstName,lastName,password)
         var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
        //  res.json(newUser)
         res.json(token)
     } catch(err) {
         res.status(400)
         res.json(err)
     }
 }

 //authentication not active for testing purpose
 const authenticate = async (req: Request, res: Response) => {
    const username = req.body.firstName;
    const user: User = {
      firstName: username,
      lastName: req.body.lastName,
      password: req.body.password,
      id:parseInt(req.params.id)
    }
    try {
        const u = await store.authenticate(user)
        var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET);
        res.json(token)
    } catch(error) {
        res.status(401)
        res.json({ error })
    }
  }

//  Authorization: Bearer <token>

 const verifyAuthToken = (req: Request, res: Response, next:NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization
          //@ts-ignore
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        if(decoded.id !== req.params.id) {
            throw new Error('User id does not match!')
        }

        next()
    } catch (error) {
        res.status(401)
    }
}
 
 

// const user_routes = (app: express.Application) =>{
// 	app.get('/users', index)
//     app.get('/users/:id', show)
//     app.post('/user', create)
// }

export const user_routes = (app:express.Application) =>{
    app
	app.get('/users',verifyAuthToken, index)
    app.get('/users/:id',verifyAuthToken, show)
    app.post('/user',verifyAuthToken, create)
}

// export default user_routes