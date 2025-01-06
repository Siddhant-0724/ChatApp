import Router from 'express'
import { getAllContacts, getContactForDmList, searchContact } from '../controllers/Contact.Controller.js'
import {verifyToken} from '../middleware/Auth.Middleware.js'
const contactRoutes = Router()

contactRoutes.post('/search',verifyToken,searchContact)
contactRoutes.get('/get-contact-for-dm',verifyToken,getContactForDmList)
contactRoutes.get('/get-all-contact',verifyToken,getAllContacts)


export default contactRoutes