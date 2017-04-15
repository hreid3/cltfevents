import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "../route";
import {IResource} from '../IResource'

import * as express from "express";

/**
 * / route
 *
 * @class User
 */
export class EventResource extends BaseRoute implements IResource {

    /**
     *
     * @returns {Router}
     */
    getRoutes(): Router {
        //add root route
        const router = Router()
        router.get("/", (req: Request, res: Response, next: NextFunction) => {
            this.index(req, res, next)
        });

        router.post("/", (req: Request, res: Response, next: NextFunction) => {
            this.create(req, res, next)
        });
        return router
    }

    getResourceBase(): string {
        return '/event';
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
    public index(req: Request, res: Response, next: NextFunction) {
        const events = []
        this.json(req, res, events)
    }

    public create(req: Request, res: Response, next: NextFunction) {
        this.json(req, res, "ok")
    }
}