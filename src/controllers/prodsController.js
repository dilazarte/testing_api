const { getProds, getProdById, postProds, putProds, deleteProds } = require("../services/prodsServices");


async function getProducts(req, res){
    const id = req.params.id;
    if(id){
        const data = await getProdById(id);
        res.status(200).json(data);
    } else {
        const data = await getProds();
        res.status(200).json(data);
    }
}

async function postProducts(req, res){
    const newProducto = req.body
    const data = await postProds(newProducto)
    res.status(200).json(data);
}

async function putProducts(req, res){
    const id = req.params.id;
    const dataToUpdate = req.body;
    const data = await putProds(id, dataToUpdate);
    res.status(200).json(data)
}

async function deleteProducts(req, res){
    const id = req.params.id;
    const data = await deleteProds(id);
    res.status(200).json(data)
}

module.exports = {getProducts, postProducts, putProducts, deleteProducts}