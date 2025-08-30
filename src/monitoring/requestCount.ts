import { NextFunction, Request, Response } from 'express'
import client from 'prom-client'

// active users whose request hasnt yet resolved
const activeUserGauge = new client.Gauge({
    name: 'active_users',
    help: 'Total Number of users whose request hasnt yet resolved',
    labelNames: ['method', 'route']
})

export function activeCount(req: Request, res: Response, next: NextFunction) {

    activeUserGauge.inc({
        method: req.method,
        route: req.path,
    })
    
    res.on('finish', () => {
        activeUserGauge.dec({
            method: req.method,
            route: req.path,
        })
    })
    next();
}

// request count 
const requestCounter = new client.Counter({
    name: 'request_count',
    help: 'Number of requests',
    labelNames: ['method', 'route', 'status_code']
})

export function requestCount(req: Request, res: Response, next: NextFunction) {
    requestCounter.inc({
        method: req.method,
        route: req.path,
        status_code: res.statusCode
    })
    next();
}