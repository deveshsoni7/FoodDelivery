import expree from 'express'
import authMiddleware from '../middleware/auth.js';
import { addToCart,getCart,removeFromCart } from '../controllers/cartController.js'

const cartRouter = expree.Router();


cartRouter.post('/add',authMiddleware,addToCart)

cartRouter.post('/remove',authMiddleware,removeFromCart)

cartRouter.post('/get',authMiddleware,getCart)


export default cartRouter;