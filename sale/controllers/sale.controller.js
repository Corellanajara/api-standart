const SaleModel = require('../models/sale.model');
const crypto = require('crypto');
exports.insert = (req, res) => {
SaleModel.createSale(req.body)
.then((result) => {
res.status(201).send({id: result._id});
});
};exports.list = (req, res) => {
let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
let page = 0;
if (req.query) {
if (req.query.page) {
req.query.page = parseInt(req.query.page);
page = Number.isInteger(req.query.page) ? req.query.page : 0;
}
}
SaleModel.list(limit, page)
.then((result) => {
res.status(200).send(result);
})
};
exports.getById = (req, res) => {
SaleModel.findById(req.params.saleId)
.then((result) => {
res.status(200).send(result);
});
};
exports.patchById = (req, res) => {
SaleModel.patchSale(req.params.saleId, req.body)
.then((result) => {
res.status(204).send({});
});
};
exports.removeById = (req, res) => {
SaleModel.removeById(req.params.saleId)
.then((result)=>{
res.status(204).send({});
});
};