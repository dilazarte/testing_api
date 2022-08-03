const express = require('express')
const { DaoCarritoMongo } = require('../DAOs/DaosMongoCarrito')
const cartData = new DaoCarritoMongo()
const {Router} = express
const { authCheck } = require('../middlewares/authCheck')

const adminRouter = Router()

adminRouter.get('/', authCheck, async(req, res)=>{
    // res.render('admin', {name: req.session.user})
    
    if (req.isAuthenticated()) {
        let user = req.user;
        let cartItems = await cartData.getDocById(user.cartRef);
        let Qty = cartItems[0]
        res.render('admin', {
            name: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
            cart: user.cartRef,
            cartQty: Qty.productos.length,
            session:true
        })
    } else {
        res.redirect('login')
    }
})

module.exports= adminRouter