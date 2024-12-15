import userModal from '../models/userModal.js'


//add items to user cart

const addToCart = async (req, res) => {
    try {
        let userData = await userModal.findOne({ _id: req.body.userId })
        let cartData = await userData.cartData;

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;

        }
        else {
            cartData[req.body.itemId] += 1;
        }
        await userModal.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ sucess: true, message: "Added to cart" })
    } catch (error) {
        console.log(error)
        res.json({ sucess: false, message: "Error" })
    }
}

//remove item from usr cart

const removeFromCart = async (req, res) => {
    try {
        let userData = await userModal.findById(req.body.userId)
        let cartData = await userData.cartData;

        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModal.findByIdAndUpdate(req.body.userId, { cartData });

        res.json({ sucess: true, message: "Remove from cart" });
    } catch (error) {
        console.log("Error")
        res.json({ sucess: false, message: "Error" });
    }
}

//fetch user cart data

const getCart = async (req, res) => {
    try {
        let userData = await userModal.findById(req.body.userId);
        let cartData = await userData.cartData;

        res.json({ sucess: true, cartData });
    } catch (error) {
        console.log("Error")
        res.json({ sucess: false, message: "Error" });
    }

}


export { addToCart, getCart, removeFromCart }
