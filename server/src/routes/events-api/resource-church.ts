import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "../route";
import {IResource} from '../IResource'

import * as express from "express";
import Church from "../../models/Church";
import {ValidationError} from "mongoose";

/**
 * / route
 *
 * @class User
 */
export class ChurchResource extends BaseRoute implements IResource {

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
        return '/church';
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body
            const church = await Church.create(data)
            this.json(req, res, church)
        } catch (err) {
            let status = 500
            if (err.name === 'ValidationError') { // Fragile, but could not determine type with instanceof
                status = 400
            }
            this.jsonError(req, res, status, err)
        }
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
    async index(req: Request, res: Response, next: NextFunction) {
        try {
            const churches = await Church.find().lean().exec()
            this.json(req, res, churches)
        } catch (err) {
            this.jsonError(req, res, 500, err)
        }
    }
}