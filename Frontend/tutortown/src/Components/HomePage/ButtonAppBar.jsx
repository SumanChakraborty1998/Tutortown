import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from '@material-ui/icons/Menu';
import logo from "../Images/logo.png";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "100%",
        position: "fixed",
        zIndex: 10,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    margin: {
        marginLeft: 50,
        fontSize: 18,
    },
}));

export default function ButtonAppBar() {
    
    const classes = useStyles();
    const history = useHistory();

    const handleUrlChange = (url) => {
        history.push(url);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        {/* <MenuIcon /> */}
                        <img
                            width="50px"
                            style={{borderRadius: "50%"}}
                            src={logo}
                            alt=""
                            onClick={() => history.push("/")}
                        />
                    </IconButton>
                    <Typography
                        variant="h6"
                        className={classes.title}
                    ></Typography>
                    <Button className={classes.margin} color="inherit" onClick={() => handleUrlChange('/admin/tutorTown/login')}>
                        Admin
                    </Button>
                    <Button
                        className={classes.margin}
                        color="inherit"
                        onClick={() => handleUrlChange("/signup")}
                    >
                        Sign up
                    </Button>
                    <Button
                        className={classes.margin}
                        color="inherit"
                        onClick={() => handleUrlChange("/login")}
                    >
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
