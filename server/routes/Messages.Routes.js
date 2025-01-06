import Router from 'express'
import {verifyToken} from '../middleware/Auth.Middleware.js'
import { getMessages, uploadFiles } from '../controllers/Messages.controller.js'
import multer from 'multer'

const messageRoutes = Router()
const  upload = multer({dest:'uploads/files'})

messageRoutes.post('/get-messages',verifyToken,getMessages)
messageRoutes.post('/upload-file',verifyToken,upload.single("file"),uploadFiles)

export default messageRoutes