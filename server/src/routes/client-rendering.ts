import { NextFunction, Request, Response, Router } from "express";
import {IResource} from './IResource'
import { BaseRoute } from "./route";

/**
 * / route
 *
 * @class User
 */
export class IndexRoute extends BaseRoute implements IResource {

    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    public getRoutes(): Router {
        const router = Router()
        router.get("*", (req: Request, res: Response, next: NextFunction) => {
            this.index(req, res, next);
        });
        return router
    }


    getResourceBase(): string {
        return '/';
    }

    /**
     * The home page route.
     *
     * @class IndexRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
     */
    public index(req: Request, res: Response, next: NextFunction) {
        this.render(req, res, "index", {});
    }
}
