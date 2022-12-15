const SentMailHistoric = require('../models/SentMailHistoric');
const handleError = require('../../utils/handler-error');
const handleSuccess = require('../../utils/handler-success');
const Gmail = require('node-gmail-api');


exports.findAllSentMails = async (req, resp) => {
    try{
        const mailHistoric = await SentMailHistoric.find()
            .exec();

        return handleSuccess(resp, mailHistoric);


    }catch(error){
        return handleError(500, resp,error);
    }
}


