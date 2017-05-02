/**
 * Created by hreid on 4/15/17.
 */

var mongoose = require('mongoose')
mongoose.Promise = global.Promise;
var mongoDB = `mongodb://${process.env.MONGO_DB_HOST}/cltfevents`;
var Dimension = require('../dist/models/Dimension').default
var ChurchModel = require('../dist/models/Church').default
var async = require('async')

mongoose.connect(mongoDB);

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// this.app.locals.db = db

async function createChurch(church, cb) {
    ChurchModel.create(church, function (err, doc) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Chuch created:', doc)
    })
}

async function addChurches(cb) {
    async.parallel([
        function(callback) {
            var churches  = [
                {
                    title: "Winner's Chapel",
                    phoneNumber: '(845) 343-0241',
                    location: {
                        label: "Winners' Chapel",
                        street: "36 North Street",
                        city: "Middletown",
                        state: "NY",
                        postal: "10940"
                    }
                },
                {
                    title: "Christian Love Tabernacle, Inc",
                    phoneNumber: '(914) 969-3244',
                    location: {
                        label: "Christian Love Tabernacle, Inc",
                        street: "5 Manor House Square",
                        city: "Yonkers",
                        state: "NY",
                        postal: "10701"
                    }
                },
                {
                    title: "Life Line of Hope in Christ Ministries",
                    phoneNumber: '(914) 664-5889',
                    location: {
                        label: "Life Line of Hope in Christ Ministries",
                        street: "507 South Fifth Avenue",
                        city: "Mount Vernon",
                        state: "NY",
                        postal: "10550"
                    }
                },
                {
                    title: "Rose of Sharon Ministries Inc",
                    phoneNumber: '(203) 324-7902',
                    location: {
                        label: "Rose of Sharon Ministries Inc",
                        street: "71 Stillwater Avenue",
                        city: "Stamford",
                        state: "CT",
                        postal: "06902"
                    }
                },
                {
                    title: "Christian Love Tabernacle #2, Inc",
                    phoneNumber: '(914) 216-8682',
                    location: {
                        label: "Christian Love Tabernacle #2, Inc",
                        street: "814B South Parker Drive",
                        city: "Florence",
                        state: "SC",
                        postal: "29501"
                    }
                },
                {
                    title: "Rose of Sharon Outreach Ministries (Rose #2)",
                    phoneNumber: '(203) 324-7902',
                    location: {
                        label: "Rose of Sharon Outreach Ministries (Rose #2)",
                        street: "708 Hollett Street",
                        city: "Bridgeport",
                        state: "CT",
                        postal: "06908"
                    }
                },
            ]
            churches.forEach(val => {
                createChurch(val, callback)
            })
        }
    ])
}

function exit(db) {
    process.exit(0)
}
async.series([
    addChurches
])