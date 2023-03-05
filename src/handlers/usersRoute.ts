import express, {Request, Response, NextFunction } from 'express'
import {User, UserStore} from '../models/user'
// import jwt from 'jsonwebtoken'
var jwt = require('jsonwebtoken');

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
         var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
        //  res.json(newUser)
         res.json(token)
     } catch(err) {
         res.status(400)
         res.json(err)
     }
 }

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
 
 

const user_routes = (app: express.Application) =>{
	app.get('/users',verifyAuthToken, index)
    app.get('/users/:id',verifyAuthToken, show)
    app.post('/users',verifyAuthToken, create)
}

export default user_routes