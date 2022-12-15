const SentMailHistoric = require('../models/SentMailHistoric');
const TemplateEmail = require('../models/TemplateEmail');
const mongoose = require('mongoose');
const handleError = require('../../utils/handler-error');
const handleSuccess = require('../../utils/handler-success');
const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
    }
})


exports.sendMailAndRegisterHistoric = async  (req, resp) => {
    try{
        const payload = req.body;
        console.log(payload);
        if(!payload.templateId || !payload.from || !payload.to){
            return resp.status(400).send({ success: false, message: 'All fields are requireds'});
        }
        const template = await TemplateEmail.findOne({
            templateId: mongoose.Types.ObjectId(payload.templateId)
        });

        if(!template){
            return handleError(404, resp, { message: 'Template not founded.'});

        }

        console.log('template',template)
        const emailPayload = {
            from: payload.from,
            to: payload.to,
            subject: template.subject,
        }
        if (template.isHtml) {

            emailPayload.html = template.content;

        } else {
            emailPayload.text = template.content;
        }

        await transporter.sendMail(emailPayload);

        const debtSaved = await SentMailHistoric.create(payload);
        return handleSuccess(resp, debtSaved);

    }catch(error){
        console.log(error)
        return handleError(500, resp,error);
    }

}


exports.findAllSentMails = async (req, resp) => {
    try{
        const mailHistoric = await SentMailHistoric.find()
            .exec();

        return handleSuccess(resp, mailHistoric);


    }catch(error){
        return handleError(500, resp,error);
    }
}


