import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "../route";
import { IResource } from '../IResource'

import * as express from "express";
import Attendee from '../../models/Person'
import {ObjectID} from "mongodb";
import {Dimension} from "../../models/Dimension";
import {Church} from '../../models/Church'

/**
 * / route
 *
 * @class User
 */
export class AttendeeResource extends BaseRoute implements IResource {

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

        router.get("/search", (req: Request, res: Response, next: NextFunction) => {
            this.search(req, res, next)
        })

        router.get("/roles", (req: Request, res: Response, next: NextFunction) => {
            this.rolesLookup(req, res, next)
        });

        router.get("/status", (req: Request, res: Response, next: NextFunction) => {
            this.statusLookup(req, res, next)
        });
//58faa6084d004eaf425ef31c
        router.get("/:id([a-f0-9]{24})", (req: Request, res: Response, next: NextFunction) => {
            this.showAttendee(req, res, next)
        })

        router.post("/", (req: Request, res: Response, next: NextFunction) => {
            this.createOrUpdate(req, res, next)
        })

        router.delete('/:id([0-9]+)', (req: Request, res: Response, next: NextFunction) => {
            this.delete(req, res, next)
        } )

        router.put('/:id([0-9]+)', (req: Request, res: Response, next: NextFunction) => {
            this.createOrUpdate(req, res, next)
        } )

        return router
    }

    getResourceBase(): string {
        return '/attendee'
    }

    protected async search(req: Request, res: Response, next: NextFunction) {
        const q = req.query.q
        if (!q) {
            this.index(req, res, next)
        } else {
            console.log("q", q)
            try {
                Attendee.search(
                    {query_string: {query:"*" + q + "*"}},
                    {hydrate: true},
                    (err, results) => {
                        let newResults = results.hits.hits.map(async (val) => {
                            val.role = await Dimension.findOne({_id: val.role})
                            val.status = await Dimension.findOne({_id: val.status})
                            if (val.homeChurch) {
                                val.homeChurch = await Church.findOne({_id: val.homeChurch})
                            }
                            return val
                        })

                        Promise.all(newResults)
                            .then(fullData => this.json(req, res, fullData))
                            .catch(err => this.jsonError(req, res, 500, err))
                    }
                )
            } catch (err) {
                console.error(err)
                this.jsonError(req, res, 500, err)
            }
        }
    }

    protected async delete(req: Request, res: Response, next: NextFunction){
        try {
            const result = await Attendee.findOneAndRemove({_id: req.params.id})
            this.json(req, res, result)
        } catch(e) {
            this.jsonError(req, res, 500, e)
        }
    }

    protected async showAttendee(req: Request, res: Response, next: NextFunction) {
        try {
            const anAttendee = await Attendee.findOne({_id: req.params.id}).populate(this.populateFields)
            this.json(req, res, anAttendee)
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
        const attendees = await Attendee.find()
            .populate(
                this.populateFields
            )
        this.json(req, res, attendees)
    }

    protected async createOrUpdate(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body
            let anAttendee = null;
            if (data && data._id && (data._id === -1 || data._id === '-1')) {
                delete data._id
            } else if (data && data._id) {
                anAttendee = await Attendee.findOne({_id: data._id})
            }
            if (!anAttendee) {
                // if (data && !data.slug && data.title) {
                //     data.slug = slug(data.title, {lower: true}) + '-' + Math.floor(Math.random() * 6) + 1
                // }
                anAttendee = await Attendee.create(data)
            } else {
                const result = await anAttendee.update(data)
                console.log(result)
            }
            // console.log('Got', data)
            this.json(req, res, anAttendee)
        } catch (err) {
            let status = 500
            if (err.name === 'ValidationError') { // Fragile, but could not determine type with instanceof
                status = 400
            }
            this.jsonError(req, res, status, err)
        }
    }

    async rolesLookup(req: Request, res: Response, next: NextFunction) {
        const roles = await Dimension.getByType('PersonRole')
        this.json(req, res, roles)
    }

    async statusLookup(req: Request, res: Response, next: NextFunction) {
        const roles = await Dimension.getByType('PersonStatus')
        this.json(req, res, roles)
    }

    protected transformField(data, dataField, newDataField): void {
        if (data && data[dataField] && data[dataField]._id) {
            const temp = data[dataField]._id
            delete data[dataField]
            data[newDataField] = { _id: new ObjectID(temp) }
        }
    }

    private populateFields = [
        {path: 'status'},
        {path: 'role'},
        {path: 'homeAddress'},
        {path: 'homeChurch'},
    ]
}
