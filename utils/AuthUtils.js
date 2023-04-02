const validator = require("validator");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { resolve } = require("path");

const cleanUpAndValidate = ({ name, email, username, password, phoneNumber }) => {
    return new Promise((resolve, reject) => {
        if (typeof email != "string") reject("Invalide Email");
        if (typeof name != "string") reject("Invalide name");
        if (typeof password != "string") reject("Invalide password");
        if (typeof phoneNumber != "string") reject("Invalide phoneNumber");
        if (typeof username != "string") reject("Invalide username");


        if (!email || !password || !username || !password) {
            reject("Invalid Data")
        }

        if (!validator.isEmail(email)) reject("Invalid Email");
        if (username.length < 3 || username.length > 20) reject("Invalid Username");
        if (password.length < 5 || password.length > 20) reject("password should be in between 5 to 20 characters.");
        if (phoneNumber.length !== 10) reject("phone number should have 10 digits.")
        resolve();
    })
};



const jwtSign = (email) => {
    const JWT_TOKEN = jwt.sign({ email: email }, "hellobuddy", {
        expiresIn: "15d",
    })
    return JWT_TOKEN;
}


const sendVerificationEmail = (email, verificationToken) => {
    console.log("buddy")
    let mailer = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        service: "Gmail",
        auth: {
            user: "np4639783@gmail.com",
            pass: "lhncvudmeiimwwvp"
        }
    })

    let sender = "Profile App";
    let mailOptions = {
        from: sender,
        to: email,
        subject: "Email Verification for  App",
        html: `Press <a href=http://localhost:3000/verifyEmail/${verificationToken}> Here </a> to verify your account.`,
    };
    // if(where === "verifyemail"){

    // }else{
    //     let mailOptions = {
    //       from: sender,
    //       to: email,
    //       subject: "Email Verification for  App",
    //       html: `Press <a href=http://localhost:3000/forgetPassword/${verificationToken}> Here </a> to verify your account.`,
    //     };

    // }

    mailer.sendMail(mailOptions, function (err, response) {
        if (err) throw err;
        else console.log("Mail has been sent successfully");
    });
}

const validateEmail = (email) => {
    return new Promise((resolve, reject) => {
        if (!email || typeof email !== "string") reject("wrong email");
        if (!validator.isEmail(email)) reject("invalide error")
        resolve();
    })
}


module.exports = { cleanUpAndValidate, jwtSign, sendVerificationEmail, validateEmail };