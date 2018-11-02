const collection = require('./connect');
const emailsPerDay = require('../lib/emails-per-day');
const emailRecipients = require('../lib/email-recipients');

describe('aggregates enron messages', () => {
    it('finds the min, max, and average emails per', () => {
        return collection().aggregate(emailsPerDay)
            .toArray()
            .then(([{ min, max, avg }]) => {
                expect(min).toEqual(1);
                expect(max).toEqual(20);
                expect(avg).toEqual(6.103658536585366);
            });
    });

    it('finds the number of message sent to each email address and sorts in descending order', () => {
        return collection().aggregate(emailRecipients)
            .toArray()
            .then(tos => {
                tos.forEach(to => {
                    expect(to).toHaveProperty('_id');
                    expect(to).toHaveProperty('count');
                });

                expect(tos[0]._id).toEqual('don.baughman@enron.com');
                expect(tos[0].count).toEqual(188);
            });
    });
});
