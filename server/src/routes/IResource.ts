import {Router} from 'express'

/**
 * Created by hreid on 4/10/17.
 */

export interface IResource {
    getRoutes(): Router
    getResourceBase(): string
}