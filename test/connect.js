const { MongoClient } = require('mongodb');

let close = null;
let collection = null;
beforeAll(() => {
    return MongoClient.connect('mongodb://alchemy:s3cret@ds249233.mlab.com:49233/enron', { useNewUrlParser: true })
        .then(client => {
            collection = client.db('enron').collection('enron_messages');
            close = client.close.bind(client);
            return collection;
        });
});

afterAll(() => {
    return close(true);
});


module.exports = () => collection;
