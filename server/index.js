import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import authRoutes from "./routes/Auth.Routes.js"
import contactRoutes from "./routes/Contact.Routes.js"
import socketServer from "./socket.js"
import messageRoutes from "./routes/Messages.Routes.js"
import channelRoutes from "./routes/Chanel.Routes.js"

dotenv.config()

const app = express()
const port = process.env.PORT || 3001;
const databaseUrl = process.env.DATABASE_URL

app.use(cors({
    origin:process.env.ORIGIN,
    methods:["GET","POST","PUT","PATCH","DELETE"],
    credentials:true
}))

app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use("/uploads/files", express.static("uploads/files"));

app.use(cookieParser())
app.use(express.json())

app.use("/api/auth",authRoutes)
app.use("/api/contacts",contactRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/channel",channelRoutes)




const server = app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`)
})
socketServer(server)
mongoose.connect(databaseUrl).then(()=>console.log("DB connected sucessfully"))
