const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const Contactchema = new Schema({
name : String,
rut : String,
email : String,
phone : String,
status : Boolean,
enterpriseId : String,
UserId : String,

}, { timestamps: true }
);
Contactchema.virtual('id').get(function () {
return this._id.toHexString();
});
Contactchema.set('toJSON', {
virtuals: true
});

Contactchema.findById = function (cb) {
return this.model('Contact').find({id: this.id}, cb);
};
const Contact = mongoose.model('Contact', Contactchema);
exports.findById = (id) => {
return Contact.findById(id)
.then((result) => {
result = result.toJSON();
delete result._id;
delete result.__v;
return result;
});
};
exports.createContact = (ContactData) => {
const contact = new Contact(ContactData);
return contact.save();
};
exports.list = (perPage, page) => {
return new Promise((resolve, reject) => {
Contact.find()
.limit(perPage)
.skip(perPage * page)
.exec(function (err, contact) {
if (err) {
reject(err);
} else {
resolve(contact);
}
})
});
};
exports.patchContact = (id, ContactData) => {
return new Promise((resolve, reject) => {
Contact.findById(id, function (err, contact) {
if (err) reject(err);

console.log(ContactData);
for (let i in ContactData) {
contact[i] = ContactData[i];
}
contact.save(function (err, updatedContact) {
if (err) return reject(err);
resolve(updatedContact);
});
});
})
};
exports.removeById = (ContactId) => {
return new Promise((resolve, reject) => {
Productos.remove({_id: ContactId}, (err) => {
if (err) {
reject(err);
} else {
resolve(err);
}
});
});
};