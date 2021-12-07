let mongoose = require('mongoose')

let Schema = mongoose.Schema

const Faculty = new Schema(
    {
        kode: String,
        prodi: String,
        fakultas: String
    }, {
        timestamps: false,
        collection: 'fakultas_prodi'
    }
)

module.exports = mongoose.model('Faculty', Faculty)