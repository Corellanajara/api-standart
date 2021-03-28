const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const Salechema = new Schema({
date : Date,
mount : Number,
documents : Array,
status : Boolean,
enterpriseId : String,
userId : String,

}, { timestamps: true }
);
Salechema.virtual('id').get(function () {
return this._id.toHexString();
});
Salechema.set('toJSON', {
virtuals: true
});

Salechema.findById = function (cb) {
return this.model('Sale').find({id: this.id}, cb);
};
const Sale = mongoose.model('Sale', Salechema);
exports.findById = (id) => {
return Sale.findById(id)
.then((result) => {
result = result.toJSON();
delete result._id;
delete result.__v;
return result;
});
};
exports.createSale = (SaleData) => {
const sale = new Sale(SaleData);
return sale.save();
};
exports.list = (perPage, page) => {
return new Promise((resolve, reject) => {
Sale.find()
.limit(perPage)
.skip(perPage * page)
.exec(function (err, sale) {
if (err) {
reject(err);
} else {
resolve(sale);
}
})
});
};
exports.patchSale = (id, SaleData) => {
return new Promise((resolve, reject) => {
Sale.findById(id, function (err, sale) {
if (err) reject(err);

console.log(SaleData);
for (let i in SaleData) {
sale[i] = SaleData[i];
}
sale.save(function (err, updatedSale) {
if (err) return reject(err);
resolve(updatedSale);
});
});
})
};
exports.removeById = (SaleId) => {
return new Promise((resolve, reject) => {
Productos.remove({_id: SaleId}, (err) => {
if (err) {
reject(err);
} else {
resolve(err);
}
});
});
};