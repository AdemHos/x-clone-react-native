import expres from 'express'
import { protectRoute } from '../middleware/auth.middleware.js'
import { deleteNotification, getNotifications } from '../controlers/notification.controler.js'

const router = expres.Router()

router.get("/",protectRoute,getNotifications)
router.delete("/:notificationId",protectRoute,deleteNotification)



export default router