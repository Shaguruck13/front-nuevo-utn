/* import express from "express";
import serveStatic from "serve-static";
import path from "path";

const app = express()

const __dirname = path.resolve();

app.use("/", serveStatic(path.join(__dirname, "build")))
app.use ("/", (req,res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"))
})
const port = process.env.PORT || 8000
app.listen(port) */

const express = require("express")
const app = express();

const path = require("path")

const port = process.env.PORT || 8000

if(process.env.NODE_ENV === "production") {
    app.use(express.static('build'));
 /*    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    }) */
} 


app.listen(port, (err) => {
    if(err) return console.log(err);
    console.log('server running on port: ', port);
})

