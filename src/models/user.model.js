import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"
import { error } from "console";

const JWT_SECRETCODE = "qwertyuiop#123"


const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        middleName: {
            type: String,
            trim: true,
            lowercase: true
        },
        orgName: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        gstNumber: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true
        },
        mobNumber: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true
        },
        address: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        tokens: [{
            token: String,
        }]

    }
)

//Checks if email and password exist in db
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (user) {
        const permit = await bcrypt.compare(password, user.password)
        console.log(permit)
        if (permit) {
            return user
        }
        throw new Error()
    }
    throw new Error("Error: Wrong credentials!")
}

//Generates auth token
userSchema.methods.generateAuthToken = function () {
    const user = this
    return jsonwebtoken.sign({ _id: user._id }, JWT_SECRETCODE)
}

// converts normal pass to hashed before saving it to database
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = bcrypt.hashSync(this.password, 9)
    }
    next()
})

export const User = mongoose.model("User", userSchema)