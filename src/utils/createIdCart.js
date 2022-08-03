const {DaoCarritoMongo} = require('../DAOs/DaosMongoCarrito');
const {carritos} = require('../models/mongoCarritoModel');
const daoCarts = new DaoCarritoMongo()

async function cartID() {
    const data = await daoCarts.createCart()
    const id = data._id
    return id;
    
}

module.exports = {cartID}