const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    verificationToken: String,
    addresses: {
        type: String,
        required: true
    },
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cart"
        }
    ],
    orderInfo: [
        {
            SelectedDate: String,
            DeliveryDays: String,
            selectedTime: String
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});
// SelectedDate, selectedTime, DeliveryDays
// selectedDate, selectedTime, DeliveryDays
const User = mongoose.model("User", userSchema);
module.exports = User;
