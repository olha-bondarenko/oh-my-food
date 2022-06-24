import express from "express";
import cors from "cors";
import { sample_foods, sample_tags, sample_users } from "./data";
import jwt from 'jsonwebtoken';

const app = express();
// app.use(express.json);
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));

app.get("/api/foods", (req, res) => {
    res.send(sample_foods);
})

app.get("/api/foods/search/:search", (req, res) => {
    const search = req.params.search;
    const foods = sample_foods.filter(data => data.name.toLowerCase().includes(search.toLowerCase()));
    res.send(foods);
})

app.get("/api/foods/tags", (req, res) => {
    res.send(sample_tags);
})

app.get("/api/foods/tag/:tag", (req,res) => {
    const tag = req.params.tag;
    const foods = sample_foods.filter(data => data.tags?.includes(tag));
    res.send(foods);
})

app.get("/api/foods/:id", (req, res) => {
    const id = req.params.id;
    const foods = sample_foods.find(food => food.id === id);
    res.send(foods);
})

app.post("/api/users/login", (req, res) => {
    const {email, password} = req.body;
    const user = sample_users.find(user => user.email === email && 
        user.password === password);
    if (user) {
        res.send(generateTokenResp(user));
    }
    else {
        res.status(400).send('User name or password is not valid!');
    }
})

const generateTokenResp = (user:any) => {
    const token = jwt.sign({
        email: user.email,
        isAdmin: user.isAdmin
    }, 'RandomTxt', {
        expiresIn: '30d'
    });
    user.token = token;
    return user;
}


const port = 5000;
app.listen(port, () => {
    console.log("Served on http://localhost:" + port);
})