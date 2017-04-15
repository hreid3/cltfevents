import { NextFunction, Request, Response, Router, Application } from "express";
import { BaseRoute } from "../route";
import {IResource} from '../IResource'
import {ChurchResource} from './resource-church'
import {EventResource} from './resource-event'
import Address  from "../../models/Address";
import Event from "../../models/Event";
import Dimension from "../../models/Dimension";
// import {Event, Address} from "../../entities/index";

/**
 * / route
 *
 * @class User
 */
export class EventsApiResource extends BaseRoute implements IResource {

    /**
     *
     * @returns {Router}
     */
    getRoutes(): Router {
        //add root route
        const router = Router()
        router.get("/", (req: Request, res: Response, next: NextFunction) => {
            this.root(req, res, next)
        });
        const churchResource = new ChurchResource(this.app)
        this.app.use(this.getResourceBase() + churchResource.getResourceBase(), churchResource.getRoutes())

        const eventResource = new EventResource(this.app)
        this.app.use(this.getResourceBase() + eventResource.getResourceBase(), eventResource.getRoutes())

        router.get("/status", (req: Request, res: Response, next: NextFunction) => {
            this.statusLookup(req, res, next)
        });
        router.get("/type", (req: Request, res: Response, next: NextFunction) => {
            this.typeLookup(req, res, next)
        });
        router.get("/level", (req: Request, res: Response, next: NextFunction) => {
            this.levelLookup(req, res, next)
        });
        router.get("/address/states", (req: Request, res: Response, next: NextFunction) => {
            this.addressStatesLookup(req, res, next)
        });
        return router
    }

    getResourceBase(): string {
        return '/api/events/v1';
    }

    protected root(req: Request, res: Response, next: NextFunction) {
        this.json(req, res, {todo: "list all endpoints"})
    }

        /**
     * The root page route.
     *
     * @class IndexRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
         */
    async statusLookup(req: Request, res: Response, next: NextFunction) {
        const statuses = await Dimension.getByType('EventStatus')
        this.json(req, res, statuses)
    }

    async typeLookup(req: Request, res: Response, next: NextFunction) {
        const eventTypes = await Dimension.getByType('EventType')
        this.json(req, res, eventTypes)
    }

    async levelLookup(req: Request, res: Response, next: NextFunction) {
        const eventLevels = await Dimension.getByType('EventLevel')
        this.json(req, res, eventLevels)
    }

    async addressStatesLookup(req: Request, res: Response, next: NextFunction) {
         this.json(req, res, Address.getStates())
    }

}