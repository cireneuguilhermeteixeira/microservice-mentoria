const Kafka = require('node-rdkafka');
const templateEmailType = require('../../app/models/kafka/TemplateEmail');
const TemplateEmailModel = require('../../app/models/TemplateEmail');
const mongoose = require('mongoose');

var consumer = new Kafka.KafkaConsumer({
  'group.id': 'kafka',
  'metadata.broker.list': 'localhost:9092',
}, {});

consumer.connect();

consumer.on('ready', () => {
  console.log('(mongo service template-email) - consumer is ready..')
  consumer.subscribe(['templateemail']);
  consumer.consume();
}).on('data', async function(data) {

  console.log(`(mongo service template-email) - received message: ${templateEmailType.fromBuffer(data.value)}`);
  const payload = JSON.parse(templateEmailType.fromBuffer(data.value));

  payload.templateId =  mongoose.Types.ObjectId(payload.templateId);

  const templateEmailSaved = await TemplateEmailModel.create(payload);
  console.log('templateEmailSaved', templateEmailSaved);

});

module.exports = consumer;