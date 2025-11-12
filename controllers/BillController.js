import {db } from "../connection.js"



const allBill = async (req, res) => {
    const bills = await db.collection('bills').find({}).toArray();
    res.status(200).json({
        data: bills
    });
}


export const BillController = {
    allBill
}