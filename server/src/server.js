import dotenv, { config } from "dotenv"
dotenv.config("./env");
import express from "express";

const app = express();
app.use(express.json());




const port = process.env.port || 5000;

app.listen(5000, () => {
    console.log(`App is runing on ${port}`);
});