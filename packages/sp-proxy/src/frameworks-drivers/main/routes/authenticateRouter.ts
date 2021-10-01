import passport from '@sp-proxy/frameworks-drivers/main/config/passportMiddleware'
import { Router } from 'express'
import session from 'express-session'

const authenticateRouter = Router()
const sessionOptions: session.SessionOptions = {
  secret: 'any secret',
  resave: false,
  saveUninitialized: false
}

authenticateRouter.use(session(sessionOptions))

authenticateRouter.use(passport.initialize())
authenticateRouter.use(passport.session())
authenticateRouter.get(
  '/authenticate',
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true })
)

export default authenticateRouter
