import express from 'express'
import { BillController } from '../controllers/BillController.js';

const billRouter = express.Router();



billRouter.get('/', BillController.allBill);
billRouter.get('/:id', BillController.singleBill);
billRouter.post('/pay', BillController.payBill);
billRouter.get('/my-bills/:email', BillController.myBill);
billRouter.patch('/my-bills/:email', BillController.myBillUpdate);


export default billRouter