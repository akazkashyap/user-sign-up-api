import express from "express";
import { database } from "./db/db.js";
import { router } from "./routes.js";
import cors from "cors"

const PORT = process.env.PORT || 3000
const app = express()

//CORS Configuration
const corsOpts = {
    origin: '*',
    methods: [
        'GET',
        'POST',
    ],
    allowedHeaders: [
        'Content-Type',
    ],
};

app.use(express.json())
app.use(cors(corsOpts));
app.use(router)





app.get("/", (req, res) => {
    return res.send({ msg: "Welcome" })
})

app.listen(PORT, () => {
    console.log("Server starting on ", PORT)
    database()
})