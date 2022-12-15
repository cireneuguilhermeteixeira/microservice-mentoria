const avro = require('avsc');

const avscSchema = avro.Type.forSchema({
  type: 'record',
  fields: [
    {
      name: 'subject',
      type: 'string',
    },
    {
      name: 'content',
      type: 'string',
    },
    {
      name: 'templateId',
      type: 'string',
    },
    {
      name: 'isHtml',
      type: 'string',
    }
  ]
});

module.exports = avscSchema;
