const PORT: number =8080



import express, { Application, Request, Response } from "express"

import cors from "cors"
import { Configuration, OpenAIApi } from "openai"
import * as dotenv from "dotenv"
dotenv.config()
const logErrors=(err:any, req:Request, res:Response, next: any)=> {
  console.error(err);
  next(err);
}
const API_KEY =process.env.API_KEY
const app: Application = express()
app.use(logErrors)
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

const configuration = new Configuration({
    // organization:"org-Sk5OdQNOFCeNnugRU2uP8Fy9",
    apiKey: API_KEY
})
const openAi = new OpenAIApi(configuration)
app.get('/home', (req: Request, res: Response) => {
    res.status(200).send("Hello Ji From get")
})
app.post('/completions', async(req: Request, res: Response) => {
    try {
       const completion= await openAi.createChatCompletion({
           model: "gpt-3.5-turbo",
           messages:[{role:"user",content:"Create a SQL request to "+req.body.message}]
       })
        
        res.status(200).send(req.body.message)
    } catch (error: any) {
        console.error(error.response)
        res.status(error.response.status).send(error.response.statusText)
    }
})




app.all('*', (req, res) => {
    res.send("Not Found")
})


app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`)
})