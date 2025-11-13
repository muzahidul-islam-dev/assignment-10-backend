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

const payBill = async (req, res) => {
    try {
        const data = req.body;
        const result = await db.collection('myBill').insertOne(data)
        res.status(200).json({
            success: true,
            message: 'You bill paid successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const myBill = async (req, res) => {
    try {
        const { email } = req?.params;
        const bills = await db.collection('myBill').find({
            email: email
        }).toArray();
        res.status(200).json({
            success: true,
            data: bills
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const myBillUpdate = async (req, res) => {
    try {
        const { id, amount, address, phone, date } = req.body;
        const { email } = req.params;

        const result = await db.collection("myBill").updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    amount,
                    address,
                    phone,
                    date,
                },
            }
        );

        const refreshData = await db.collection("myBill").find({
            email
        }).toArray();

        res.status(200).json({
            success: true,
            message: 'Bill update successfully',
            data: {
                result: result,
                allData: refreshData
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const myBillDelete = async (req,res) => {
    try {
        const { id } = req.params;
        const result = await db.collection("myBill").deleteOne({_id: new ObjectId(id)})

        res.status(200).json({
            success: true,
            message: 'Bill deleted successfully',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


export const BillController = {
    allBill,
    singleBill,
    payBill,
    myBill,
    myBillUpdate,
    myBillDelete
}