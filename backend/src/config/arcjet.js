import arcjet, {tokenBucket,shield,detectBot} from '@arcjet/node'
import {ENV} from './env.js'

// Initilalize arcjet with security rules

export const aj = arcjet({
    key: ENV.ARCJET_KEY,
    characteristics: ["ip.src"],
    rules: [
        // shield protects your app from common attacks e.g. SQL Injection, XSS, CSRF attacks
        shield({
            mode: "LIVE",
            allow: [
                "CATEGORY: SEARCH_ENGİNE"
            ],
        }),

        // Rate limiting with token bucket algoritm
        tokenBucket({
            mode: "LIVE",
            refillRate: 10, // tokens added per interval
            interval: 10, // interval in seconds (10 seconds)
            capacity: 15   // maximum tokens in bucket
        })
    ]
})