const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        orderItems: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
                name: { type: String, required: true },
                qty: { type: Number, required: true },
                price: { type: Number, required: true },
            },
        ],
        totalPrice: { type: Number, required: true, default: 0 },
        shippingAddress: { type: Object },
        paymentMethod: { type: String },
        itemsPrice: { type: Number },
        taxPrice: { type: Number },
        shippingPrice: { type: Number },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
