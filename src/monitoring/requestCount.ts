import { NextFunction, Request, Response } from 'express'
import client from 'prom-client'

// request duration
const httpsReqDurationMicroseconds = new client.Histogram({
    name: 'https_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.1, 0.5, 1, 1.5, 2, 5, 10, 15, 50, 100, 300, 500, 1000, 5000, 10000]
})

export function requestDuration(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();

    res.on('finish', () => {
        const endTime = Date.now();
        httpsReqDurationMicroseconds.observe({
            method: req.method,
            route: req.path,
            status_code: res.statusCode
        }, endTime - startTime)
    })
    next();
}

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