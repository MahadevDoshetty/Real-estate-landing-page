const express = require("express");
const cors = require('cors')
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
app.use(express.json());
app.use(cors());

async function connect() {
    await mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("Database Connected Successfully!");
    });
}
connect();
const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String
    },
    interest: {
        type: String
    },
    contactTime: {
        type: String
    }
})
const clientDetails = mongoose.model("clientDetails", clientSchema);
app.post("/register", async (req, res) => {
    const { name, email, phone, interest, contactTime } = req.body;
    const isMatch = await clientDetails.findOne({ email});
    if (isMatch) {
        return res.status(409).json({
            message: "Our team will contact you soon"
        })
    }
    try {
        await clientDetails.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            interest: req.body.interest,
            contactTime: req.body.contactTime
        });
        return res.status(201).json({
            message: "Our team will contact you soon!"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
})
app.listen(process.env.PORT, () => {
    console.log(`The server is running on ${process.env.PORT}`);
});