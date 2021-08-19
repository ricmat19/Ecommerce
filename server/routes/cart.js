const express = require('express');
const router = express.Router();
const db = require("../db");

//Add an item to a users cart
router.post('/cart', async(req, res) => {
    try{
        const cart = await db.query("SELECT cart FROM users WHERE email='ric19mat@gmail.com'");

        let currentCart = cart.rows[0].cart;
        let newItem = req.body.id;
        let qty = 1;

        //Check that new item does not exist in the cart

        let uniqueItem = true;
        if(currentCart !== null){

            for(let i=0; i < currentCart.length; i++){
                console.log("Current Cart " + i + ":" + currentCart[i]);
                console.log("Req.body.id:" + req.body.id);
                if(currentCart[i] === req.body.id){
                    uniqueItem = false;
                }
            }

            console.log("Unique Item: " + uniqueItem);

            if(uniqueItem === true){
                currentCart.push(newItem);
            }

        }else{
            currentCart = [req.body.id]
        }

        let cartQty = []
        for(let i = 0; i < currentCart.length; i++){
            cartQty.push(1);
        }

        let newCart = await db.query("UPDATE users SET cart=$1, qty=$2 WHERE email='ric19mat@gmail.com'", [currentCart, cartQty]);
        // let newCart = await db.query("UPDATE users SET cart=$1 WHERE email=$2", [currentCart, req.session.email]);
        console.log(req.session.email)

        res.status(201).json({
            status: "success",
            results: newCart.rows,
            data:{
                cart: newCart.rows
            }
        })
    }catch(err){
        console.log(err);
    }
})

//Get all collection items of a certain type
router.get("/cart", async(req, res) => {

    try{
        const cart = await db.query("SELECT * FROM users WHERE email='ric19mat@gmail.com'");

        const usersCart = [];
        console.log(cart.rows[0].cart)

        if(cart.rows[0].cart !== null){
            for(let i = 0; i < cart.rows[0].cart.length; i++){
                const cartCollection = await db.query("SELECT * FROM collection WHERE id=$1", [cart.rows[0].cart[i]]);
                usersCart.push(cartCollection.rows[0])
            }
        }

        const qty = await db.query("SELECT qty FROM users WHERE email='ric19mat@gmail.com'");
        const cartQty = qty.rows[0].qty;

        res.status(200).json({
            status: "success",
            results: usersCart.length,
            data:{
                cart: usersCart,
                qty: cartQty
            }
        })
    }catch(err){
        console.log(err);
    }
})


router.put('/cart/delete', async(req, res) => {
    try{

        const cart = await db.query("SELECT cart FROM users WHERE email='ric19mat@gmail.com'");

        const newCart = [];
        for(let i = 0; i < cart.rows[0].cart.length; i++){
            if(req.body.id !== cart.rows[0].cart[i]){
                newCart.push(cart.rows[0].cart[i])
            }
        }

        let qty = []
        for(let i=0; i < newCart.length; i++){
            qty.push(1);
        }

        if(JSON.stringify(newCart) !== JSON.stringify([])){
            console.log("items")
            const usersCart = await db.query("UPDATE users SET cart=$1, qty=$2 WHERE email='ric19mat@gmail.com' RETURNING *", [newCart, qty]);
        }else{
            console.log("no items")
            const usersCart = await db.query("UPDATE users SET cart=(NULL), qty=(NULL) WHERE email='ric19mat@gmail.com' RETURNING *");
        }

        res.status(200).json({
            status: "success"
        })
    }catch(err){
        console.log(err);
    }
})



module.exports = router;