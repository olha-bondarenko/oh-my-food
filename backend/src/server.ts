import dotenv from 'dotenv';
dotenv.config();
// process.env.MONGO_URI
const cors = require('cors');
import path from 'path';
import express from "express";
import foodRouter from './routers/food.router';
import userRouter from './routers/user.router';
import orderRouter from './routers/order.router';
import { dbConnect } from './configs/database.config';

dbConnect();

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));

app.use("/api/foods", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/orders", orderRouter);

app.use(express.static('public'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Served on http://localhost:" + port);
})