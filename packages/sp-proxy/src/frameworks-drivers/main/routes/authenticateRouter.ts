import passport from '@sp-proxy/frameworks-drivers/main/config/passportMiddleware'
import { NextFunction, Request, Response, Router } from 'express'
import session from 'express-session'

const authenticateRouter = Router()
const sessionOptions: session.SessionOptions = {
  secret: 'any secret',
  resave: false,
  saveUninitialized: false
}

authenticateRouter.use(session(sessionOptions))

// authenticateRouter.use(urlencoded({ extended: false }))
authenticateRouter.use(passport.initialize())
authenticateRouter.use(passport.session())
authenticateRouter.get(
  '/authenticate',
  (req: Request, res: Response, next: NextFunction) => {
    if (req.query.providerHost == null) {
      throw Error('no provider host')
    }
    next()
  },
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true })
)

export default authenticateRouter
