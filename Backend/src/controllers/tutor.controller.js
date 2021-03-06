const express = require("express");
const router = express.Router();

const Tutor = require("../models/tutor.model");
const Place = require("../models/place.model");
const Subject = require("../models/subject.model");
const Price = require("../models/price.model");
const Booking = require("../models/booking.model");

router.get("/", async (req, res) => {
    let tutors = await Tutor.find().lean().exec();
    return res.status(200).json({ data: tutors });
});

//For normal register part.
router.post("/new", async (req, res) => {
    let no_of_entries = Object.keys(req.body).length;
    let body = { ...req.body, is_completed: false };
    console.log("Shanoor")
    // if (no_of_entries == 16) {
    //     body = { ...body, is_completed: true };
    // }
    let tutor = await Tutor.create(body);
    return res.status(201).json({ data: tutor });
});

//For login of Tutor
router.post("/auth/login", async (req, res) => {
    let tutor = await Tutor.findOne({
        $and: [{ email: req.body.email }, { password: req.body.password }],
    })
        .lean()
        .exec();

    // let students = await Student.find({
    //     allocated_tutors: { $in: [tutor._id] },
    // })
    //     .lean()
    //     .exec();

    let bookings = await Booking.find({ tutor: tutor._id })
        .populate("student")
        .lean()
        .exec();

    // console.log(students);

    // console.log(allocated_students);
    return res.status(201).json({ data: { tutor, bookings } });
});

//Find Tutors according to place and subject
router.get("/:place/:subject", async (req, res) => {
    let place = req.params.place.toLowerCase();
    let subject = req.params.subject.toLowerCase();

    let place_found = await Place.find({ name: place }).lean().exec();
    let subject_found = await Subject.find({ name: subject }).lean().exec();

    // console.log(place_found, subject_found);

    let tutors = await Tutor.find({
        $and: [
            { subject: subject_found[0]._id },
            { place: place_found[0]._id },
            { is_completed: true },
        ],
    })
        .lean()
        .exec();

    let prices = await Price.findOne({ place_id: place_found[0]._id })
        .lean()
        .exec();

    return res.status(201).json([place_found, subject_found, tutors, prices]);
});

//Getting details of individual tutors
router.get("/tutor_data/individual/:id", async function (req, res) {
    let id = req.params.id;
    let tutor = await Tutor.findOne({ _id: id }).lean().exec();
    return res.status(201).json({ data: tutor });
});

module.exports = router;
