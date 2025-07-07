import { aj } from "../config/arcjet.js";

// Arcjet middleware for rate limiting, bot detection and security
 export const arcjetMiddleware = async(req,res,next) => {
    try {
        const decision = await aj.protect(req, {
            requested: 1, // each request consumes 1 token

        })

        // handle denied requests
        if(decision.isDenied()) {
            if(decision.reason.isRateLimit()) {
                return res.status(429).json({
                    error: "Too Many Requests",
                    message: "Try limit exceeded. Please try again later"
                })
            }else if (decision.reason.isBot()) {
             res.status(403).json({
                error: "Bot access denied",
                message: "Automated requests are not allowed"
             })
            }else {
              res.status(403).json({
                error: "Forbiden",
                message: "Acces denied by security policy"
              })
            }
                
        }

        // check for spooted bots
        if(decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
            res.status(403).json({
                error: "Spooted bot detected",
                message: "Malicious bot detected"
            })
        }
    
      next()  
    } catch (error) {
     console.error("Arcjet middleware error:",error);
     // Allow request to continue  if Arcjet fails
     next()
    }
 }