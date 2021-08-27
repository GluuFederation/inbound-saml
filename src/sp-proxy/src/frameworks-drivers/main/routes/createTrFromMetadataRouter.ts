import { Request, Response, Router } from 'express'

const createTrFromMetadataRouter = Router()

createTrFromMetadataRouter.get('/metadata', (req: Request, res: Response) => {
  res.sendStatus(200)
})

export default createTrFromMetadataRouter
