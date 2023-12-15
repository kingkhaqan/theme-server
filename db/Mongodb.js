class MongodbConnection {

    constructor() {
        const { MongoClient } = require('mongodb')
        const url = process.env.MONGODB_CONNECTION_STRING
        this.client = new MongoClient(url);

        MongodbConnection.instance = this;
    }

    static getInstance() {
        if (!MongodbConnection.instance) {
            MongodbConnection.instance = new MongodbConnection();
        }
        return MongodbConnection.instance;
    }
}

module.exports = MongodbConnection
