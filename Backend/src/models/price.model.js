const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema(
    {
        place: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "place",
            required: true,
        },
        mathematics: { type: Number, required: true },
        science: { type: Number, required: true },
        english: { type: Number, required: true },
        arts: { type: Number, required: true },
        computer: { type: Number, required: true },
    },
    { timestamps: true, versionKey: false },
);

const Price = mongoose.model("price", priceSchema);
module.exports = Price;
