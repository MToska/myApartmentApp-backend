const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default:Date.now()
    }
});
//Model
const Users = new mongoose.model("users", userSchema);

//Validation ussing Joi
function registrationValidation(user) {
    const schema = {
        username: Joi.string()
            .min(3)
            .max(30)
            .required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(8)
            .required()
    };
    return Joi.validate(user, schema);
}


exports.Users = Users;
exports.regValidate = registrationValidation;