import passport from '@sp-proxy/frameworks-drivers/main/config/passportMiddleware'
import { NextFunction, Request, Response, Router, urlencoded } from 'express'
import session from 'express-session'
import { WinstonLogger } from '../logger/WinstonLogger'

const logger = WinstonLogger.getInstance()
const authenticateCallbackRouter = Router()
const sessionOptions: session.SessionOptions = {
  secret: 'any secret',
  resave: false,
  saveUninitialized: false
}
authenticateCallbackRouter.use(urlencoded({ extended: false }))
authenticateCallbackRouter.use(session(sessionOptions))

authenticateCallbackRouter.use(passport.initialize())
authenticateCallbackRouter.use(passport.session())
authenticateCallbackRouter.post(
  '/callback',
  (req: Request, res: Response, next: NextFunction) => {
    logger.debug('/callback called')
    next()
  },
  passport.authenticate('saml', { failureFlash: true }),
  (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      res.end('AUTHENTICATED')
    } else {
      res.end('FAILURE!')
    }
  }
)

authenticateCallbackRouter.get('/isauth', (req: Request, res: Response) => {
  res.send(req.isAuthenticated())
})

export default authenticateCallbackRouter
