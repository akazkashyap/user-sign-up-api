import { Router } from "express";
import { User } from "./models/user.model.js"
import { body, validationResult } from 'express-validator';

export const router = Router()

router.post("/signup",
    //Validators
    body("email").isEmail().withMessage({
        message: "Please enter a valid email"
    }),
    body("mobNumber").isMobilePhone().withMessage({
        message: "Please enter a valid mobile"
    }),
    body("password").isStrongPassword().withMessage({
        message: "invalid password , please enter a strong password!"
    }),
    body("gstNumber").isAlphanumeric().isLength(15).withMessage({
        message: "invalid GST number , please enter a valid number!"
    }),

    //request
    async (req, res) => {
        if (!req.body) return res.status(400).send({ error: "Please fill all the details!" })

        const error = validationResult(req)
        if (!error.isEmpty()) return res.status(400).send({ error: error.errors[0].msg })

        try {
            const user = new User(req.body)
            await user.save()
            return res.status(201).send(user)
        } catch (error) {
            return res.status(404).send({ error: "Mobile Number/ GST Number/ Email already in use, Please try again!" })
        }
    })


router.post("/login", async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).send({ error: "Please enter valid credentials!" })
    try {
        const user = await User.findByCredentials(email, password)
        const token = await user.generateAuthToken()
        user.tokens = user.tokens.concat({ token: token })
        await user.save()
        return res.status(200).send({ user, token })
    } catch (error) {
        return res.status(400).send({ error: "Invalid email or password" })
    }
})