import { log } from "console"
import express, {json} from "express"
import productRouter from "./Routes"

const app =express()
app.use(json())

app.use("/Products", productRouter)

app.listen(4000, ()=>{
    console.log("server endpoints is running")
})