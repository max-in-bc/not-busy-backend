import express from 'express';


export class CommonAuthMiddleware {
    private static instance: CommonAuthMiddleware;
    static getInstance() {
        if (!CommonAuthMiddleware.instance) {
            CommonAuthMiddleware.instance = new CommonAuthMiddleware();
        }
        return CommonAuthMiddleware.instance;
    }
    constructor() {
    }
   
    async validateBodyRequest(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req.body && req.body.params && req.body.params.header){
            try{
                let parsed = Buffer.from(req.body.params.header, 'base64').toString()
                req.body.email = parsed.split('\_:_/')[0]
                req.body.password = parsed.split('\_:_/')[1]
                next();
            }catch(e){
                res.status(403).send({ error: 'Something went wrong' });
            }
            
        } else {
            res.status(400).send({ error: 'Missing body fields: email, password' });
        }
    }
}