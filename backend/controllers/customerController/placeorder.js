import OrderModel from '../../models/orderModel.js';
import asyncHandler from 'express-async-handler';
import { orderValidation } from '../../validations/orderValidation/orderValidation.js';

export const placeorder = asyncHandler(async (req, res) => {
    const { water_type, water_temperature, water_quantity, companyname, address } = req.body.order;

    const error = await orderValidation(req.body.order);

    if (error && error.errorMessage.length > 0) {
        res.status(error.statusCode).json({
            error: {
                errorMessage: error.errorMessage
            }
        });
    } else {
        try {
            const order = await OrderModel.create({
                water_type,
                water_temperature,
                water_quantity,
                address,
                company_name: companyname,
                status: 'pending',
                customer_id: req.userid,
            });

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