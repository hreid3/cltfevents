import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "../route";
import { IResource } from '../IResource'

import * as express from "express";
import Event from "../../models/Event";
import {ObjectID} from "mongodb";
import Attendee from "../../models/Person";
import {Dimension} from "../../models/Dimension";
import {Church} from "../../models/Church";
import {AttendeeEventBooking} from "../../models/AttendeeEventBooking";

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

        router.get("/:slug([a-z-0-9_-]+)/available-attendees", (req: Request, res: Response, next: NextFunction) => {
            this.showAvailableAttendees(req, res, next)
        })

        router.get("/:slug([a-z-0-9_-]+)", (req: Request, res: Response, next: NextFunction) => {
            this.showEvent(req, res, next)
        })

        router.post("/:slug([a-z-0-9_-]+)/attendees", (req: Request, res: Response, next: NextFunction) => {
            this.createOrUpdateAttendee(req, res, next)
        })

        // /attendee-payment/58faa6084d004eaf425ef31c
        router.post("/:slug([a-z-0-9_-]+)/event-booking/:eventBookingId([a-f0-9]{24})", (req: Request, res: Response, next: NextFunction) => {
            this.addAttendeePayment(req, res, next)
        })

        router.get("/:slug([a-z-0-9_-]+)/attendees", (req: Request, res: Response, next: NextFunction) => {
            this.getAttendeesForEvent(req, res, next)
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

    protected async showAvailableAttendees(req: Request, res: Response, next: NextFunction) {
        try {
            const q = req.query.q
            let query = "*" + q + "*"
            if(!q) {
                query = "*"
            }
            const slug = req.params.slug

            const anEvent = await Event.findOne({slug: req.params.slug})
            if (!anEvent) {
                this.jsonError(req, res, 404)
            }
            Attendee.search(
                {query_string: {query: query}},
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
                        .then(fullData => fullData.filter(async (val) => {
                            return true // TODO:  Need to add filter here for already registered users
                        }))
                        .then(fullData => this.json(req, res, fullData))
                        .catch(err => this.jsonError(req, res, 500, err))
                }
            )

            const availableAttendees = await Attendee.find()
                .populate(
                    this.populateFields
                )

        } catch(err) {
            this.jsonError(req, res, 500, err)
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

    protected async createOrUpdateAttendee(req: Request, res: Response, next: NextFunction) {
        try {
            // attendee: {type: Schema.Types.ObjectId, ref: 'Person', required: true},
            // event: {type: Schema.Types.ObjectId, ref: 'Event', required: true},
            // bookingDate: {type: Date, default: Date.now(), required: true},
            // numberSeatsReserved: {type: Number},
            // status: {type: Schema.Types.ObjectId, ref: 'Dimension', required: true},
            // payments: [EventPaymentSchema]
            const attendeeId = req.body.attendeeId
            const numberSeatsReserved = req.body.numberSeatsReserved || 0
            const bookingDate = req.body.bookingDate
            const status = req.body.status
            const eventBookingId = req.body.eventBookingId
            let isNew = false
            if (!eventBookingId) {
                isNew = true
            }
            const eventId = await Event.findOne({slug: req.params.slug}).select('_id')
            const data = {
                attendee: attendeeId,
                event: eventId,
                bookingDate: bookingDate,
                numberSeatsReserved: numberSeatsReserved,
                status: status
            }
            console.log(data)
            let result = null;
            if (isNew) {
                result = await AttendeeEventBooking.create(data)
            } else {
                const anAttendeeBookingEvent = AttendeeEventBooking.findOne({_id: eventBookingId});
                if (anAttendeeBookingEvent) {
                    result = await anAttendeeBookingEvent.update(data)
                } else {
                    throw Error("no event exists")
                }
            }
            this.json(req, res, result)
        } catch (err) {
            let status = 500
            if (err.name === 'ValidationError') { // Fragile, but could not determine type with instanceof
                status = 400
            }
            this.jsonError(req, res, status, err)
        }
    }

    protected async getAttendeesForEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const slug = req.params.slug
            const eventId = await Event.findOne({slug: slug}).select('_id')
            console.log(eventId._id )
            let results: any = await AttendeeEventBooking.find({event: eventId._id}).populate(this.populateAttendeeBookEventFields)
            this.json(req, res, results)
        } catch(err) {
            let status = 500
            if (err.name === 'ValidationError') { // Fragile, but could not determine type with instanceof
                status = 400
            }
            this.jsonError(req, res, status, err)
        }
    }

    protected async addAttendeePayment(req: Request, res: Response, next: NextFunction) {
        try {
            const slug = req.params.slug
            const eventBookingId =  req.params.eventBookingId
            const eventId = await Event.findOne({slug: slug}).select('_id')
            const anAttendeeBookingEvent: any = await AttendeeEventBooking.findOne({_id: eventBookingId}).populate(this.populateAttendeeBookEventFields)
            if (!anAttendeeBookingEvent) {
                this.jsonError(req, res, 404, "No Attendee Booking Record found")
            }
            console.log(anAttendeeBookingEvent.payments)
            anAttendeeBookingEvent.payments.push({
                txDate: new Date(),
                ...req.body
            })
            const result = await anAttendeeBookingEvent.update(anAttendeeBookingEvent)
            this.json(req, res, result)
        } catch(err) {
            console.log(err)
            let status = 500
            if (err.name === 'ValidationError') { // Fragile, but could not determine type with instanceof
                status = 400
            }
            this.jsonError(req, res, status, err)
        }
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

    private populateAttendeeBookEventFields = [
        {path: "attendee"},
        {path: "event"},
        {path: "payments"},
    ]
}
