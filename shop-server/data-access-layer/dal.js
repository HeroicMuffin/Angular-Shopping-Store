const mongoose = require("mongoose");

function asyncConnection() {
    return new Promise((resolve, reject) => {
        const conPath = config.mongodb.conPath;
        const options = { useNewUrlParser: true, useUnifiedTopology: true };
        mongoose.connect(conPath, options, (err, db) => {
            if (err) {
                reject(err);
                return
            }
            resolve(db)
        })
    })
}


const connect = async () => {
    try {
        const db = await asyncConnection();
        console.log(`connected to ${db.name}`)
        return db
    }
    catch (err) {
        console.error(err)
        throw Error('unable to connect to mongod service.')
    }
}



module.exports = { connect }