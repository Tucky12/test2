import * as express from 'express'
import {Request, Response} from 'express'
import * as cors from 'cors'
import {createConnection} from 'typeorm'
import { Product } from './entity/product'

const app = express()

createConnection().then(db => {
    const productRepository = db.getRepository(Product);

//app will run on 8000, front end will run on 3000,8080,4200
//if they run on different front-end ports, they will reject the request.
// Therefore, to not prevent the request, add cors so that front-end can communicate with nodes
app.use(cors({
    origin:['http://localhost:3000,', 'http://localhost:8080','http://localhost:4200,']

}))

app.use(express.json())

/*Get,find and show all the products from the repository.
Select Get and key in http://localhost:8000/api/products/all
*/
 
app.get('/api/products/all', async (req: Request, res: Response) => {
    const products = await productRepository.find()
    res.json(products)
})


/* Update the product. The product variable will be updated based on the required body.
   Select Put and key in http://localhost:8000/api/products
 Select body -> raw -> Json and type in
 {
    "title":" new title",
    "image":"new img"}
    it will be updated.
*/

app.put('/api/products/:id', async (req: Request, res: Response) => {
    const product = await productRepository.findOne(req.params.id)
    productRepository.merge(product, req.body)
    const result = await productRepository.save(product)
    return res.send(result)
})

/*create a product. All the data that will be send in the product will be in this field
 Select post and key in http://localhost:8000/api/products
 Select body, raw. Json and type in
 {
    "title":"title",
    "image":"img"}
*/

app.post('/api/products', async (req: Request, res: Response) => {
    const product = await productRepository.create(req.body);
    const result = await productRepository.save(product)
    return res.send(result)
})


/* Retrieving single product based on ID. http://localhost:8000/api/products/1
 Select get and Change the value 1  */

app.get('/api/products/:id', async (req: Request, res: Response) => {
    const product = await productRepository.findOne(req.params.id)
    return res.send(product)

})


/* Delete the product. The product variable will be deleted.
    Select Delete and key in http://localhost:8000/api/products/1

*/
app.delete('/api/products/:id', async (req: Request, res: Response) => {
    const result = await productRepository.delete(req.params.id)
    return res.send(result)

})    







console.log('Listening to port 8000 ')
app.listen (8000)

})