const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const applicationRouter = require('./applicationRouter')
const adminRouter = require ('./adminRouter')

router.use('/user', userRouter)
router.use('/application', applicationRouter)
router.use('/admin',adminRouter)

module.exports = router
