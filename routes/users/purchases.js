const express = require("express");
const router = express.Router();
const db = require("../../db");

//Add an item to a users cart
router.post("/purchases", async (req, res) => {
  try {
    //Get all items from the cart
    const purchases = await db.query(
      "SELECT purchases FROM purchases WHERE email='ric19mat@gmail.com'"
    );

    //Existing purchases information
    let currentPurchases = purchases.rows[0].purchases;
    let currentPurchasesQtys = purchases.rows[0].qty;
    let currentPurchasesDates = purchases.rows[0].purchase_date;

    let newPurchase = req.body.id;

    // Run if the current array of purchases has items
    if (currentPurchases !== null) {
      currentPurchases.push(newPurchase);
      currentPurchasesQtys.push();
      currentPurchasesDates.push(new Date());
      // Run if the current array has no items
    } else {
      currentPurchases = [newPurchase];
      currentPurchasesQtys = [req.body.qty];
      currentPurchasesDates = [new Date()];
    }

    console.log(currentPurchases);
    //Add the new purchases to the users purchase history
    let newPurchases = await db.query(
      "UPDATE purchases SET purchases=$1, qty=$2, purchase_date=$3 WHERE email='ric19mat@gmail.com'",
      [currentPurchases, currentPurchasesQtys, currentPurchasesDates]
    );

    res.status(201).json({
      status: "success",
      results: newPurchases.rows,
      data: {
        purchases: newPurchases.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a user's purchase history
router.get("/purchases", async (req, res) => {
  try {
    const purchases = await db.query(
      "SELECT * FROM purchases WHERE email='ric19mat@gmail.com'"
    );

    const usersPurchases = [];

    //Check if cart is not null
    if (purchases.rows[0].purchases !== null) {
      for (let i = 0; i < purchases.rows[0].cart.length; i++) {
        // Get a specific product from the purchase history
        const purchasedProducts = await db.query(
          "SELECT * FROM products WHERE id=$1",
          [purchases.rows[0].cart[i]]
        );
        // Add the user's products to the array
        usersPurchases.push(purchasedProducts.rows[0]);
      }
    }

    // Get the cart quantity
    const qty = await db.query(
      "SELECT qty FROM purchases WHERE email='ric19mat@gmail.com'"
    );
    const purchasesQty = qty.rows[0].qty;

    res.status(200).json({
      status: "success",
      results: usersPurchases.length,
      data: {
        cart: usersPurchases,
        qty: purchasesQty,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
