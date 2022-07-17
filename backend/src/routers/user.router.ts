import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { sample_users } from '../data';
import asyncHandler from 'express-async-handler';
import { User, UserModel } from '../models/user.model';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import bcrypt from 'bcryptjs'

const router = Router();

router.get("/seed", asyncHandler (
    async (req, res) => {
        const usersCount = await UserModel.countDocuments();
        if (usersCount > 0) {
            res.send("Seed is already done!")
            return;
        }

        await UserModel. create(sample_users);
        res.send("Seed is Done!")
    })
)

router.post("/login", asyncHandler(
    async (req, res) => {
        const {email, password} = req.body;
        await UserModel.findOne({email})
        .then((user) => {
            if (user) {
                bcrypt.compare(password, user.password, function(err, match){
                    if (match) res.send(generateTokenResp(user));
                    else {
                        res.status(HTTP_BAD_REQUEST).send('User name or password is invalid!');
                    }
                  })
            }
        });
    })
)

router.post("/register", asyncHandler(
    async (req, res) => {
        const {name, email, password, address} = req.body;
        const user = await UserModel.findOne({email});
        if (user) {
            res.status(HTTP_BAD_REQUEST).send('This user already exists');
            return;
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser: User = {
            id: '',
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            address,
            isAdmin: false
        }
        const dbUser = await UserModel.create(newUser);
        res.send(generateTokenResp(dbUser));

    })
)

const generateTokenResp = (user: User) => {
    const token = jwt.sign({
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin
    }, process.env.JWT_SECRET!, {
        expiresIn: '30d'
    });
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token
    };
}

export default router;