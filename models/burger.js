const orm = require('../config/orm.js');

let burgers = {
    selectAll: (cb) => {
        orm.selectAll('burgers', (res) => {
            cb(res);
        });
    },
    insertOne: (fields, vals, cb) => {
        orm.insertOne('burgers', fields, vals, (res) => {
            cb(res);
        });
    },
    updateOne: (objFieldVals, condition, cb) => {
        orm.updateOne('burgers', objFieldVals, condition, (res) => {
            cb(res);
        })
    },
};

module.exports = burgers;