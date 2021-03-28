const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const Documentchema = new Schema({
name : String,
type : Number,
data : Array,
status : Boolean,
userId : String,
EnterpriseId : String,

}, { timestamps: true }
);
Documentchema.virtual('id').get(function () {
return this._id.toHexString();
});
Documentchema.set('toJSON', {
virtuals: true
});

Documentchema.findById = function (cb) {
return this.model('Document').find({id: this.id}, cb);
};
const Document = mongoose.model('Document', Documentchema);
exports.findById = (id) => {
return Document.findById(id)
.then((result) => {
result = result.toJSON();
delete result._id;
delete result.__v;
return result;
});
};
exports.createDocument = (DocumentData) => {
const document = new Document(DocumentData);
return document.save();
};
exports.list = (perPage, page) => {
return new Promise((resolve, reject) => {
Document.find()
.limit(perPage)
.skip(perPage * page)
.exec(function (err, document) {
if (err) {
reject(err);
} else {
resolve(document);
}
})
});
};
exports.patchDocument = (id, DocumentData) => {
return new Promise((resolve, reject) => {
Document.findById(id, function (err, document) {
if (err) reject(err);

console.log(DocumentData);
for (let i in DocumentData) {
document[i] = DocumentData[i];
}
document.save(function (err, updatedDocument) {
if (err) return reject(err);
resolve(updatedDocument);
});
});
})
};
exports.removeById = (DocumentId) => {
return new Promise((resolve, reject) => {
Productos.remove({_id: DocumentId}, (err) => {
if (err) {
reject(err);
} else {
resolve(err);
}
});
});
};