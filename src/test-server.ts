import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
// import cors from 'cors'
import {product_routes} from './handlers/productsRoute'
import {user_routes} from './handlers/usersRoute'
import {order_routes} from './handlers/ordersRoute'
const cors = require('cors');

const app: express.Application = express()

const corsOptions = {
	origin:'http://someotherdomain.com',
	optionsSuccessStatus: 200 //some legacy browsers (IE11,various)
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

app.get('/', cors(corsOptions), function (_req: Request, res: Response, next) {
    res.send('Hello World!')
})

product_routes(app);

user_routes(app);

order_routes(app)


module.exports = app

// export default app

// app.listen(3000, function () {
//     console.log(`starting app on: ${address}`)
// })
