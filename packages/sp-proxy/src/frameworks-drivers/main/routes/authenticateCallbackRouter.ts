import passport from '@sp-proxy/frameworks-drivers/main/config/passportMiddleware'
import { NextFunction, Request, Response, Router, urlencoded } from 'express'
import session from 'express-session'
import { makeReadSpProxyConfigFacade } from '../factories/makeReadSpProxyConfigFacade'
import { generatePostProfileForm } from '../helpers/generatePostProfileForm'

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

const authenticateCallback = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  passport.authenticate('saml', { failureFlash: true })(req, res, next)
}

function callbackAction() {
  return async (req: Request, res: Response) => {
    const proxyConfigReader = makeReadSpProxyConfigFacade()
    const proxyConfig = await proxyConfigReader.do(null)
    const postProfileUrl = proxyConfig.postProfileUrl
    const formInput = {
      name: 'user',
      value: JSON.stringify(req.user)
    }
    const autoSubmitForm = generatePostProfileForm(postProfileUrl, [formInput])

    res.set('content-type', 'text/html;charset=UTF-8')
    res.status(200).send(autoSubmitForm)
  }
}

authenticateCallbackRouter.post(
  '/callback',
  authenticateCallback,
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  callbackAction()
)

export default authenticateCallbackRouter
