import { NextFunction, Request, Response, Router, Application } from "express";
import { BaseRoute } from "../route";
import {IResource} from '../IResource'
import {ChurchResource} from './resource-church'

import * as express from "express";

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
    public church(req: Request, res: Response, next: NextFunction) {
        const churches = {
                churches: [
                    { id: 1, title: "Winners' Chapel"},
                    { id: 2, title: "CLT Yonkers"},
                    { id: 3, title: "Rose of Sharon"}
                ]
            }
        this.json(req, res, churches)
    }
}