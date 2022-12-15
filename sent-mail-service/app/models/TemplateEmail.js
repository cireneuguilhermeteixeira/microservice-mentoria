const mongoose = require("../../connection/Connection");

const { Schema } = mongoose;

const TemplateEmailSchema = new Schema(
    {
        subject: { type: String, required: true },
        content: { type: String, required: true },
        templateId: { type: mongoose.Schema.Types.ObjectId, required: true },
        isHtml: { type: Boolean, default: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("TemplateEmail", TemplateEmailSchema);