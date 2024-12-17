import { Router } from 'express'
import { helloWorld as helloWorldController } from '../controllers/hello-world'

const router = Router()

router.get('/', helloWorldController)

export default router
