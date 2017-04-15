import { NextFunction, Request, Response, Application } from "express";

/**
 * Constructor
 *
 * @class BaseRoute
 */
export class BaseRoute {

    protected title: string
    private scripts: string[]

    private _app: Application;

    /**
     * Constructor
     *
     * @class BaseRoute
     * @constructor
     */
    constructor(app: Application) {
        //initialize variables
        this.title = "Tour of Heros";
        this.scripts = []
        this._app = app
    }

    get app(): Application {
        return this._app;
    }

    /**
     * Add a JS external file to the request.
     *
     * @class BaseRoute
     * @method addScript
     * @param src {string} The src to the external JS file.
     * @return {BaseRoute} Self for chaining
     */
    public addScript(src: string): BaseRoute {
        this.scripts.push(src)
        return this;
    }

    /**
     * Render a page.
     *
     * @class BaseRoute
     * @method render
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param view {String} The view to render.
     * @param options {Object} Additional options to append to the view's local scope.
     * @return void
     */
    public render(req: Request, res: Response, view: string, options?: Object) {
        //add constants
        res.locals.BASE_URL = "/";

        //add scripts
        res.locals.scripts = this.scripts;

        //add title
        res.locals.title = this.title;

        //render view
        res.render(view, options)
    }

    protected json(req: Request, res: Response, payload: Object, metadata?: Object) {
        if (!metadata) {
            metadata = {};
        }
        const header = {
            timestamp: new Date().toISOString(),
            cached: false,
        }
        const response = {
            header: header,
            payload: payload,
            metadata: metadata
        }
        res.json(response)
    }

    protected jsonError(req: Request, res: Response, statusCode: number, reason?: any) {
        if (statusCode < 100) {
            statusCode = 500
        }
        res.json(statusCode, {reason: reason}) // Goes into log file
    }
}