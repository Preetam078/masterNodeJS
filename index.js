import express, { json } from "express";
import data from "./data.js";

const server = express();
server.use(express.json());


//get request...
server.get("/",(req, res)=> {
    res.status(200).json(data)
})

// post request...
server.post('/', async(req, res) => {
    const newData = req.body;
    try {
        await data.push(newData);
        res.status(201).json({newData:"success"})
    } catch (error) {
        console.error(error)
    }
})

//query request ...
server.get("/find",async (req, res) => {
    try {
        const query = await req.query.author;
        const newData = await data.find((val) => val.author===query.toString());
        res.status(201).json(newData);
    } catch (error) {
        res.status(401);json({error})
    }
})



server.listen(4000, ()=> {
    console.log("server connected");
})