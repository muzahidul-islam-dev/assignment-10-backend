import express from 'express'
import { BillController } from '../controllers/BillController.js';

const billRouter = express.Router();


billRouter.get('/', BillController.allBill);
billRouter.get('/:id', BillController.singleBill);


export default billRouter