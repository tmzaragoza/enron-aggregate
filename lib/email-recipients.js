module.exports = [
    { $unwind: '$headers.To' },
    { $project: { to: '$headers.To', date: { $dateToString: { format: '%Y-%m-%d', date: '$headers.Date' } } } },
    { $group: { _id: '$to', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
];
