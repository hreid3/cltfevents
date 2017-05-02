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

async function createDimension(id, title, type, cb) {
    Dimension.find()
        .where('id').equals(id)
        .where('type').equals(type)
        .exec()
        .then(
            function (val) {
                if (val.length == 0) {
                    Dimension.create({id: id, title: title, type: type}, function (err, doc) {
                        if (err) {
                            cb(err, null)
                            return
                        }
                        console.log('New Dimension created:', doc)
                    })
                } else {
                    console.log('Dimension Exists for:', id, title, type)
                }
            },
            function (rejected) {
                console.log('I was rejected', rejected)
            }
        )
        .catch(function(val) {
            console.log(val)
        })
}

async function createRoles(cb) {
    async.parallel([
        function(callback) {
            createDimension('admin', 'Administrator', 'PersonRole')
            createDimension('event-coordinator', 'Event Coordinator', 'PersonRole')
            createDimension('attendee', 'Attendee', 'PersonRole')
            createDimension('guest-speaker', 'Guest Speaker', 'PersonRole')
            createDimension('supplier', 'Supplier', 'PersonRole')
        }
    ])
}

async function createPeopleStatus(cb) {
    async.parallel([
        function(callback) {
            createDimension('active', 'Active', 'PersonStatus')
            createDimension('inactive', 'Inactive', 'PersonStatus')
            createDimension('barred', 'Barred', 'PersonStatus')
            createDimension('Opted-out', 'Opted-out', 'PersonStatus')
        }
    ])
}

async function createEventTypes(cb) {
    async.parallel([
        function(callback) {
            createDimension('public', 'Public', 'EventType')
            createDimension('private', 'Private', 'EventType')
            createDimension('special', 'Special', 'EventType')
        }
    ])
}

async function createEventStatuses(cb) {
    async.parallel([
        function(callback) {
            createDimension('published', 'Published', 'EventStatus')
            createDimension('closed', 'Closed', 'EventStatus')
            createDimension('draft', 'Draft', 'EventStatus')
            createDimension('cancelled', 'Cancelled', 'EventStatus')
            createDimension('under-review', 'Under Review', 'EventStatus')
        }
    ])
}

async function createEventLevels(cb) {
    async.parallel([
        function(callback) {
            createDimension('Fellowship', 'Fellowship', 'EventLevel')
            createDimension('Church', 'Church', 'EventLevel')
            createDimension('External', 'External', 'EventLevel')
        }
    ])
}

function exit(db) {
    process.exit(0)
}
async.series([
    createRoles,
    createEventLevels,
    createEventStatuses,
    createEventTypes,
    createPeopleStatus
    // exit
])