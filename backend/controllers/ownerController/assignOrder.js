import OrderModel from "../../models/orderModel.js";
export async function assignOrder(req, res) {
	const { worker_id, order_id } = req.body;

	try {
		const order = await OrderModel.findOne({ _id: order_id });

		if (null === order) {
			res.status(404).json({
				error: {
					errorMessage: ['oder is not found']
				}
			})
		}
		else {
			const updatedOrder = await OrderModel.updateOne(
				{ _id: order_id },
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
