import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");
import { IndexRoute } from "./routes/client-rendering";
import {EventsApiResource} from './routes/events-api'
import {IResource} from './routes/IResource'
// import {Configuration, AnnotationMappingProvider} from "hydrate-mongodb";
import {MongoClient} from "mongodb";
// import {SessionFactoryRegistry} from "./daos/index";

/**
 * The server.
 *
 * @class Server
 */
export class Server {

    public app: express.Application;

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    public static bootstrap(): Server {
        return new Server();
    }

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        //create expressjs application
        this.app = express();

        //configure application
        this.config();

        //add routes
        this.routes();

        //add api
        this.api();
    }

    /**
     * Create REST API routes
     *
     * @class Server
     * @method api
     */
    public api() {
        //empty for now
    }

    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    public config() {
        //add static paths
        this.app.use(express.static(path.join(__dirname, "public")));

        //configure pug
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "pug");

        //use logger middlware
        // this.app.use(logger("dev"));

        //use json form parser middlware
        this.app.use(bodyParser.json());

        //use query string parser middlware
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        //use cookie parker middleware middlware
        this.app.use(cookieParser("SECRET_GOES_HERE"));

        //use override middlware
        this.app.use(methodOverride());

        //catch 404 and forward to error handler
        this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        //error handling
        this.app.use(errorHandler());

        // this.setupSessionFactory();
        this.setupMongooseConnection();
    }
    /**
     * Create router
     *
     * @class Server
     * @method api
     */
    public routes() {
// Add resources where
        const resources: Array<IResource> = [
            new EventsApiResource(this.app),
            new IndexRoute(this.app)
        ]

        resources.map((val) => this.app.use(val.getResourceBase(), val.getRoutes()))
    }

    setupMongooseConnection(): void {
        const mongoose = require('mongoose')
        mongoose.Promise = global.Promise;
        const mongoDB = 'mongodb://localhost/cltfevents';
        mongoose.connect(mongoDB);

//Get the default connection
        const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        this.app.locals.db = db
    }

    // public setupSessionFactory(): void {
    //     const config = new Configuration()
    //     const entityModules = [];
    //     const path = require('path')
    //     // require('fs').readdirSync(__dirname + '/entities').forEach((file) => entityModules.push(require(path.join(__dirname) + '/entities/' + path.basename(file, '.js'))))
    //     config.addMapping(new AnnotationMappingProvider(require('./entities')));
    //     MongoClient.connect('mongodb://localhost/clfeventdb', (err, db) => {
    //         if (err) {
    //             throw err
    //         }
    //         config.createSessionFactory(db, (err, sessionFactory) => {
    //             if (err) {
    //                 console.error( err)
    //                 throw err
    //             } else {
    //                 SessionFactoryRegistry.setSessionFactory(sessionFactory)
    //             }
    //         })
    //     })
    // }
}