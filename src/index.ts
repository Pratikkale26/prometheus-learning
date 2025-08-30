import express from "express";
import { requestCount } from "./monitoring/requestCount";
import client from 'prom-client';

const app = express();
app.use(requestCount);

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.get("/user", (req, res) => {
    res.send("PK!");
})

app.post("/user", (req, res) => {
    res.json({
        name: "Pratik"
    });
})

app.get("/metrics", async (req, res) => {
    const metrics = await client.register.metrics();
    res.set('Content-Type', client.register.contentType);
    res.end(metrics);
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});