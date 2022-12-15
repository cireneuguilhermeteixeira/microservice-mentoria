const mongoose = require('../../connection/Connection');
const Schema = mongoose.Schema;

const sentMailHistoricSchema = new Schema({

    templateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TemplateEmail',
        required: true,
    },
    from : { type : String, required : true,  },
    to   : { type : String,   required : true,  },

}, 
{ timestamps: true }
);

module.exports = mongoose.model('SentMailHistoric',sentMailHistoricSchema);