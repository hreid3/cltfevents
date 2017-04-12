import { NextFunction, Request, Response, Router, Application } from "express";
import { BaseRoute } from "../route";
import {IResource} from '../IResource'
import {ChurchResource} from './resource-church'

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
        const churchResource = new ChurchResource(this.app);
        this.app.use(this.getResourceBase() + churchResource.getResourceBase(), churchResource.getRoutes())

        router.get("/status", (req: Request, res: Response, next: NextFunction) => {
            this.statusLookup(req, res, next)
        });
        router.get("/type", (req: Request, res: Response, next: NextFunction) => {
            this.typeLookup(req, res, next)
        });
        router.get("/level", (req: Request, res: Response, next: NextFunction) => {
            this.levelLookup(req, res, next)
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
    public statusLookup(req: Request, res: Response, next: NextFunction) {
        const status = [
            {id: 'published', title: "Published"},
            {id: 'closed', title: "Closed"},
            {id: 'draft', title: "Draft"},
            {id: 'cancelled', title: "Cancelled"},
            {id: 'under-review', title: "Under Review"},
        ]
        this.json(req, res, status)
    }

    public typeLookup(req: Request, res: Response, next: NextFunction) {
        const status = [
            {id: 'public', title: "Public"},
            {id: 'private', title: "Private"},
            {id: 'special', title: "Special"},
        ]
        this.json(req, res, status)
    }

    public levelLookup(req: Request, res: Response, next: NextFunction) {
        const status = [
            {id: 'Fellowship', title: "Fellowship"},
            {id: 'Church', title: "Church"},
            {id: 'External', title: "External"},
        ]
        this.json(req, res, status)
    }


}