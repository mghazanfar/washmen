const mongoose = require('mongoose')

const partnerSchema = new mongoose.Schema({
    id: Number,
    urlName: String,
    organization: String,
    customerLocations: String,
    willWorkRemotely: Boolean,
    website: String,
    services: String,
    offices: [
      {
        location: String,
        address: String,
        coordinates: String
      }
    ]
})

module.exports = mongoose.model('Partner', partnerSchema)