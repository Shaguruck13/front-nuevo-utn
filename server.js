import express from "express";
import serveStatic from "serve-static";
import path from "path";

const app = express()

const __dirname = path.resolve();

app.use("/", serveStatic(path.join(__dirname, "build")))
app.use ("/", (req,res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"))
})
const port = process.env.PORT || 8000
app.listen(port)