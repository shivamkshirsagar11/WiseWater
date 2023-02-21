import OrderModel from "../../models/orderModel.js";
export async function assignOrder(req, res) {
	console.log(req.body)
	const { worker_id, orderId } = req.body;
	console.log(orderId);
	try {
		const order = await OrderModel.findOne({ orderId });

		if (null === order) {
			res.status(404).json({
				error: {
					errorMessage: ['oder is not found']
				}
			})
		}
		else {
			const updatedOrder = await OrderModel.updateOne(
				{ orderId },
				{ $set: { worker_id: worker_id, status: "assigned" } }
			);
			res.status(200).json({
				updated: true,
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: {
				errorMessage: ['Interanl Server Error']
			}
		})
	}
}
