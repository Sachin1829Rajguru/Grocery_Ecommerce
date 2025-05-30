import Product from '../models/product.js'
import Order from '../models/order.js'
import User from '../models/user.js'
import stripe from "stripe";
export const placeordercod = async (req, res) => {
    try {
        const { userid, items, address } = req.body;
        if (!address || items.length === 0)
            return res.json({ success: false, message: "Invalid data" });
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        }, 0)
        amount += Math.floor(amount * 0.02);
        await Order.create({
            userid,
            items,
            amount,
            address,
            paymentType: "COD"
        })
        return res.json({ success: true, message: "Order Placed Successfully" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}







export const placeorderstripe = async (req, res) => {
    try {
        const { userid, items, address } = req.body;
        const { origin } = req.headers;
        if (!address || items.length === 0 || !userid)
            return res.json({ success: false, message: "Invalid data" });
        let productdata = [];
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            productdata.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity
            });
            return (await acc) + product.offerPrice * item.quantity;
        }, 0)
        amount += Math.floor(amount * 0.02);
        const order = await Order.create({
            userid,
            items,
            amount,
            address,
            paymentType: "Online"
        })
        const stripeinstance = new stripe(process.env.STRIPE_SECRET_KEY);
        const line_items = productdata.map(item => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name
                    },
                    unit_amount: Math.floor(item.price + item.price * 0.02) * 100
                },
                quantity: item.quantity
            }
        })
        const session = await stripeinstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderid: order._id.toString(),
                userid
            }
        })
        await Order.findByIdAndUpdate(order._id, { isPaid: true });
        await User.findByIdAndUpdate(userid, { cartitems: {} });
        return res.json({ success: true, url: session.url });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}









export const stripewebhook = async (request, response) => {
    const stripeinstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const sig = request.headers["stripe-signature"];
    let event;
    try {
        event = stripeinstance.webhooks.constructEvent(
            request.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        response.status(400).send(`Webhook Error: ${error.message}`);
    }

    switch (event.type) {
        case "payment_intent.succeeded": {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;
            const session = await stripeinstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            });
            const { orderid, userid } = session.data[0].metadata;
            await Order.findByIdAndUpdate(orderid, { isPaid: true });
            await User.findByIdAndUpdate(userid, { cartitems: {} });
            break;
        }
        case "payment_intent.payment_failed": {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;
            const session = await stripeinstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            });
            const { orderid } = session.data[0].metadata;
            await Order.findByIdAndDelete(orderid);
            break;
        }
        default:
            console.error(`Unhandled event type ${event.type}`);
            break;

    }
    response.json({ received: true });
}








export const getuserorders = async (req, res) => {
    try {

        const userid = req.userid;
        const orders = await Order.find({
            userid,
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate("items.product address").sort({ createdAt: -1 });
        return res.json({ success: true, orders });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}







export const getallorders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate("items.product address").sort({ createdAt: -1 });
        return res.json({ success: true, orders });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}







