import { ObjectId } from "mongodb";
import { db } from "../connection.js"



const allBill = async (req, res) => {
    const bills = await db.collection('bills').find({}).toArray();
    res.status(200).json({
        success: true,
        data: bills
    });
}

const singleBill = async (req, res) => {
    try {
        const bill = await db.collection('bills').findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!bill) {
            return res.status(404).json({ message: 'Bill not found' });
        }

        res.status(200).json({
            success: true,
            data: bill
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message
         });
    }
}


export const BillController = {
    allBill,
    singleBill
}