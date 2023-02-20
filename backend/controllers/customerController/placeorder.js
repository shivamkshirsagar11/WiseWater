import OrderModel from '../../models/orderModel.js';
import companyModel from '../../models/companyModel.js';
import asyncHandler from 'express-async-handler';
import { orderValidation } from '../../validations/orderValidation/orderValidation.js';

export const placeorder = asyncHandler(async (req, res) => {
    const { water_type, water_quantity, companyname, address } = req.body.order;

    const { waterPrice } = await companyModel.findOne({ name: companyname }, { waterPrice: 1, _id: 0 });
    console.log(waterPrice[water_type]);

    const error = await orderValidation(req.body.order);

    if (error && error.errorMessage.length > 0) {
        res.status(error.statusCode).json({
            error: {
                errorMessage: error.errorMessage
            }
        });
    } else {
        try {
            const order = new OrderModel({
                water_type,
                water_quantity,
                address,
                company_name: companyname,
                status: 'pending',
                cost: waterPrice[water_type],
                customer_id: req.userid,
            });
            order.orderId = await order.orderid;
            await order.save();
            res.status(200).json({
                message: 'from place order'
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: {
                    errorMessage: ['Interanl Server Error']
                }
            })
        }
    }
});