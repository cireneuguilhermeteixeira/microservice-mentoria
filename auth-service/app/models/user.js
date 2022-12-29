const mongoose = require("../../connection/Connection");

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
});

module.exports = mongoose.model("User", UserSchema);
