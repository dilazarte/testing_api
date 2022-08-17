// const DaoProductosMongo =  require('../DAOs/DaosMongoProductos')
// const daoProdsMongo = new DaoProductosMongo()

const prodFactory = require('../factories/prodsMongoFactory')
const dbProdsFactory = prodFactory.createInstance()

async function getProds(){
    const allProds = await dbProdsFactory.getAllDoc()
    return allProds
}

async function getProdById(id){
    const prodById = await dbProdsFactory.getDocById(id)
    return prodById
}

async function postProds(newProducto){
    if(newProducto && newProducto.nombre && newProducto.descripcion && newProducto.foto && newProducto.codigo && newProducto.precio && newProducto.stock){
        newProducto.precio = parseInt(newProducto.precio)
        newProducto.stock = parseInt(newProducto.stock)
        const id = await dbProdsFactory.addDoc(newProducto)
        return id;
    }else{
        return {error: 'Verifique los datos'}
    }
}

async function putProds(id, dataToUpdate){
    const data = await dbProdsFactory.updateDoc(id, dataToUpdate)
    return data;
}

async function deleteProds(id){
    const data = await dbProdsFactory.deleteDoc(id)
    return data;
}


module.exports = {getProds, getProdById, postProds, putProds, deleteProds}