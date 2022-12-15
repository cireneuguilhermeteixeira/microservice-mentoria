const Kafka =  require('node-rdkafka');

const stream = Kafka.Producer.createWriteStream({
  'metadata.broker.list': 'localhost:9092'
}, {}, {
  topic: 'templateemail'
});

stream.on('error', (err) => {
  console.error('Error in our kafka stream');
  console.error(err);
});

module.exports = stream;
