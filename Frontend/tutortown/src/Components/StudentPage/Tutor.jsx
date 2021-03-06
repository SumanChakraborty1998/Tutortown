import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTutorData, postTutorData } from "../../Redux/Student/action";
import styles from "./Tutor.module.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(5),
        minWidth: 180,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


const Tutor = () => {
    const classes = useStyles();

    // const [demoCount, setDemoCount] = useState(0);
    // const [rowCount, setRowCount] = useState(0);

    const [showDash, setShowDash] = useState(0);

    const [canBook, setCanBook] = useState(false);

    const [ownBookings, setOwnBookings] = useState([]);

    const [state, setState] = React.useState({
        age: "",
        name: "hai",
    });

    const [state2, setState2] = React.useState({
        location: "",
        name: "hai",
    });

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };
    // console.log(state.age, state.name);

    const handleChange2 = (event) => {
        const name = event.target.name;
        setState2({
            ...state2,
            [name]: event.target.value,
        });
    };
    // console.log(state2.location, state2.name);

    const tutorData = useSelector((state) => state.tutor.tutorData);
    // const place = useSelector((state) => state.tutor.place);
    // const student = useSelector((state) => state.tutor.student);
    const { student_data } = useSelector((state) => state.loginred);

    console.log(student_data);

    const dispatch = useDispatch();

    // let demoCount=0
    const [status, setStatus] = React.useState("");
    const [offer, setOffer] = React.useState(1500);

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        // setCanBook(false);

        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js",
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const data = await fetch(
            `http://localhost:3001/paid_bookings/razorpay/${offer}`,
            { method: "POST" },
        ).then((t) => t.json());

        // console.log(data)
        const name = "Suman";
        const email = "suman@gmail.com";

        const options = {
            key: "rzp_test_J2k9Sh8dP5mkAX",
            currency: data.currency,
            amount: data.amount.toString(),
            order_id: data.id,
            name: "Payments",
            description: "Thank you for nothing. Please give us some money",
            image: "",
            handler: function (response) {
                setStatus(response.razorpay_payment_id);
                // alert(response.razorpay_order_id)
                // alert(response.razorpay_signature
            },
            prefill: {
                name,
                email,
                phone_number: "9899999999",
            },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        setTimeout(() => {
            handleBookDemo();
        }, 15000);
    }

    const handleSearch = (subj, loc) => {
        dispatch(getTutorData(state.age, state2.location));
    };

    // const handlePayNow = () => {};

    const handleRender = (id) => {
        // alert("thissdknfdghjdgfhf")
        axios
            .get(`http://localhost:3001/bookings/${id}`)
            .then((res) => setOwnBookings(res.data.data));
        console.log(id);
    };

    const handleBookDemo = (tutor = "610d479c3c1c0647584bd482") => {
        setCanBook(true);

        const payload = {
            tutor,
            subject: "610d4004c384fa09dcfc8436",
            student: "610d6a0488073b2d941ff6aa",
            place: "610d25e6771f892995d9b86e",
        };
        setShowDash((prev) => prev + 1);
        console.log(payload);
        dispatch(postTutorData(payload));

        setTimeout(() => {
            handleRender("610d6a0488073b2d941ff6aa");
        }, 1500);
    };

    useEffect(() => {
        // dispatch( handleBookDemo() )
        if (canBook) {
            setTimeout(() => {
                setCanBook(false);
            }, 2000);
        }

        // setTimeout(() => {
        //     handleRender(student_data?.student?._id);
        // }, 2500);
    }, [dispatch, canBook, showDash]);

    useEffect(() => {
        handleRender("610d6a0488073b2d941ff6aa");
    }, [dispatch]);

    // console.log();

    // if (tutorData.length>0) {

    // let tutorDetails = tutorData.data.tutors
    // console.log(tutorDetails);

    // }

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />

            <div>
                <div className={styles.dashMainCont}>
                    <div className={styles.dashHeading}>
                        <div>SN</div>
                        <div>SUBJECT NAME</div>
                        <div>TUTOR</div>
                        <div>PLACE</div>
                        {/* <div>TYPE</div> */}
                    </div>
                    {console.log(ownBookings)}

                    {ownBookings.length > 0 &&
                        ownBookings.map((booking, i) => (
                            <div key={booking._id} className={styles.dashRows}>
                                <div>{i + 1}</div>

                                <div>{booking.subject.name.toUpperCase()}</div>
                                <div>{booking.tutor.name.toUpperCase()}</div>
                                <div>{booking.place.name.toUpperCase()}</div>
                            </div>
                        ))}
                    <hr />
                </div>
            </div>

            <form className={classes.root} noValidate autoComplete="off">
                {/* <TextField id="outlined-basic" label="Subject" color="secondary" variant="outlined" />
                <TextField id="outlined-basic" label="Outlined" color="secondary" variant="outlined" /> */}

                <FormControl
                    color="secondary"
                    required
                    className={classes.formControl}
                    
                >
                    <InputLabel style={{fontSize:20}} htmlFor="age-native-required">
                        Subject
                    </InputLabel>
                    <Select
                        native
                        value={state.age}
                        onChange={handleChange}
                        name="age"
                        inputProps={{
                            id: "age-native-required",
                        }}
                    >
                        <option aria-label="None" value="" />
                        <option value="mathematics">Mathematics</option>
                        <option value="science">Science</option>
                        <option value="english">English</option>
                        <option value="computer">Computer</option>
                        <option value="arts">Arts</option>
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                </FormControl>

                <FormControl
                    color="secondary"
                    required
                    className={classes.formControl}
                >
                    <InputLabel style={{fontSize:20}} htmlFor="location-native-required">
                        Location
                    </InputLabel>
                    <Select
                        native
                        value={state2.location}
                        onChange={handleChange2}
                        name="location"
                        inputProps={{
                            id: "location-native-required",
                        }}
                    >
                        <option aria-label="None" value="" />
                        <option value="Delhi-East">Delhi-East</option>
                        <option value="Delhi-West">Delhi-West</option>
                        <option value="Delhi-South">Delhi-South</option>
                        <option value="Noida">Noida</option>
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                </FormControl>

                <Button
                    onClick={handleSearch}
                    variant="contained"
                    color="secondary"
                    size="large"
                    style={{ marginTop: "44px", marginLeft: "40px" }}
                    disableElevation
                >
                    Search
                </Button>
            </form>

            <div className={styles.display}>
                {tutorData[2]?.map((item, i) => (
                    <div key={i} className={styles.tutorCard}>
                        <div>
                            <img
                                className={styles.roundImg}
                                width="100%"
                                src={item.profile_photo}
                                alt=""
                            />
                        </div>
                        <div className={styles.bigFont}>
                            I'm{" "}
                            <span className={styles.colorText}>
                                {item.name}
                            </span>
                        </div>
                        <div>
                            {item.experience} Years of Teaching Experience
                        </div>
                        <br />
                        <Button
                            onClick={() => handleBookDemo(item._id)}
                            variant="contained"
                            color="secondary"
                            size="large"
                            disabled={ownBookings.length >= 3}
                            disableElevation
                        >
                            Free Trial
                        </Button>{" "}
                        <Button
                            onClick={displayRazorpay}
                            variant="contained"
                            color="secondary"
                            size="large"
                            disableElevation
                        >
                            Proceed To Pay
                        </Button>
                    </div>
                ))}
            </div>
            <br />
            <br />
            <br />
            <br />

            {canBook && (
                <div className={styles.bgCard}>
                    <div className={styles.demoModalCard}>
                        {`Successfully booked! Enjoy Learning.`}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tutor;
