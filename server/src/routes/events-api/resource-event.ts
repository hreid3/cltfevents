import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "../route";
import { IResource } from '../IResource'

import * as express from "express";
import Event from "../../models/Event";
import {ObjectID} from "mongodb";

const slug = require('slug')
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
        })

        router.get("/:slug([a-z-0-9_-]+)", (req: Request, res: Response, next: NextFunction) => {
            this.showEvent(req, res, next)
        })

        router.post("/", (req: Request, res: Response, next: NextFunction) => {
            this.createOrUpdate(req, res, next)
        })

        router.delete('/:slug([a-z-0-9_-]+)', (req: Request, res: Response, next: NextFunction) => {
            this.delete(req, res, next)
        } )

        router.put('/:slug([a-z-0-9_-]+)', (req: Request, res: Response, next: NextFunction) => {
            this.createOrUpdate(req, res, next)
        } )
        return router
    }

    getResourceBase(): string {
        return '/event'
    }

    protected async delete(req: Request, res: Response, next: NextFunction){
        try {
            const result = await Event.findOneAndRemove({slug: req.params.slug})
            this.json(req, res, result)
        } catch(e) {
            this.jsonError(req, res, 500, e)
        }
    }

    protected async showEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const anEvent = await Event.findOne({slug: req.params.slug}).populate(this.populateFields)
            this.json(req, res, anEvent)
        } catch (e) {
          this.jsonError(req, res, 500, e)
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
    protected async index(req: Request, res: Response, next: NextFunction) {
        const events = await Event.find()
            .populate(
                this.populateFields
            )
        this.json(req, res, events)
    }

    protected async createOrUpdate(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body
            let anEvent = null;
            if (data && data._id && (data._id === -1 || data._id === '-1')) {
                delete data._id
            } else if (data && data._id) {
                anEvent = await Event.findOne({_id: data._id})
            }
            if (!anEvent) {
                if (data && !data.slug && data.title) {
                    data.slug = slug(data.title, {lower: true}) + '-' + Math.floor(Math.random() * 6) + 1
                }
                anEvent = await Event.create(data)
            } else {
                const result = await anEvent.update(data)
                console.log(result)
            }
            // console.log('Got', data)
            this.json(req, res, anEvent)
        } catch (err) {
            let status = 500
            if (err.name === 'ValidationError') { // Fragile, but could not determine type with instanceof
                status = 400
            }
            this.jsonError(req, res, status, err)
        }
    }

    protected transformField(data, dataField, newDataField): void {
        if (data && data[dataField] && data[dataField]._id) {
            const temp = data[dataField]._id
            delete data[dataField]
            data[newDataField] = { _id: new ObjectID(temp) }
        }
    }

    private populateFields = [
        {path: 'eventStatus'},
        {path: 'eventType'},
        {path: 'eventLevel'},
        {path: 'hostingChurch'},
    ]
}
