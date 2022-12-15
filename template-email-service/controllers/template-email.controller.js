const stream = require('../services/producer/templateMailProducer');
const templateMailType = require('../model/kafka/TemplateEmail')
const TemplateEmailModel = require('../model/mongo/TemplateEmail')
const handleError = require('../utils/handler-error');
const handleSuccess = require('../utils/handler-success');
const mongoose = require('mongoose');

exports.create = async (req, resp) => {
    try {

        const { subject, content, isHtml } = req.body;

        if(!subject || !content || !isHtml){
            return resp.status(400).send({ success: false, message: 'Todos Campos sao obrigatorios'});
        }
        const templateId = mongoose.Types.ObjectId()
        const response = await TemplateEmailModel.create({...req.body, templateId});
        const event  = {subject, content, isHtml, templateId: String(templateId)};
        const success = stream.write(templateMailType.toBuffer(event));     
        if (success) {
            console.log(`message queued (${JSON.stringify(event)})`);
            return resp.json({ success: true, message: `message queued (${JSON.stringify(event)})`, response });
        } else {
            return resp.status(500).json({ success: false, message: `Too many messages in the queue already..` });
          }
    } catch (error) {
        console.log("error", error);
        return resp.status(500).send({ success: false, message: JSON.stringify(error)});
    }
};


exports.findAllTemplates = async (req, resp) => {
    try{
        const templates = await TemplateEmailModel.find()
            .exec();

        return handleSuccess(resp, templates);


    } catch(error){
        return handleError(resp,error);
    }
}