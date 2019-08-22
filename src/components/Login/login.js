import withStylee from '@material-ui/core/styles/withStyles';
import '../Css/register.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import {
    Button,
    CardBody, CardFooter,
    CardHeader,
    CardImg, CardTitle,
    Col,
    Container,
    Row
} from "reactstrap";
import React, {Component} from "react";
import ExamplesNavbar from "components/Navbars/RegisterNavbar.jsx";
import {PropTypes} from 'prop-types';
import {Typography} from "@material-ui/core";

const styles = {
    form: {
        textAlign: 'center'
    },
    leftForm: {
        textAlign: 'Right',
        marginTop: '20px',
        marginRight: '10px'
    },
    textField: {

        '& label.Mui-focused': {
            color: '#fc62e5',
        },
        '& label': {
            color: '#fcd3fa',
        },
        '& label.MuiInputLabel-filled': {
            color: '#fcd3fa',
        },
    },
    input: {
        color: 'white'
    },
    underline: {
        '&:before': {
            borderBottomColor: '#fcd3fa',
        },
        '&:after': {
            borderBottomColor: '#fc62e5',
        },
        '&:hover:before': {
            borderBottomColor: ['#cb75fc', '!important'],
        },
    },
    button: {
        marginTop: '20px'
    },
    error:{
        marginTop: '10px',
        color: '#fc2887',
        fontSize: '0.7am'
    },
    ladowanie:{
        color: '#fc4edb'
    }
};

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        }
    }

    state = {
        squares1to6: "",
        squares7and8: ""
    };

    componentDidMount() {
        document.body.classList.toggle("register-page");
        document.documentElement.addEventListener("mousemove", this.followCursor);
    }

    componentWillUnmount() {
        document.body.classList.toggle("register-page");
        document.documentElement.removeEventListener(
            "mousemove",
            this.followCursor
        );
    }

    followCursor = event => {
        let posX = event.clientX - window.innerWidth / 2;
        let posY = event.clientY - window.innerWidth / 6;
        this.setState({
            squares1to6:
                "perspective(500px) rotateY(" +
                posX * 0.05 +
                "deg) rotateX(" +
                posY * -0.05 +
                "deg)",
            squares7and8:
                "perspective(500px) rotateY(" +
                posX * 0.02 +
                "deg) rotateX(" +
                posY * -0.02 +
                "deg)"
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        axios.defaults.baseURL = 'http://localhost:5001/projekt-studia/us-central1/api';
        axios.post('/login', userData)
            .then(res => {
                console.log(res.data);
                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({
                    errors: err.response.data,
                    loading: false
                })
            })
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const {classes} = this.props;
        const {errors, loading} = this.state;
        return (
            <>
                <ExamplesNavbar/>
                <div className="page-header">
                    <div className="content">
                        <Container>
                            <Row>
                                <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                                    <div
                                        className="square square-7"
                                        id="square7"
                                        style={{transform: this.state.squares7and8}}
                                    />
                                    <div
                                        className="square square-8"
                                        id="square8"
                                        style={{transform: this.state.squares7and8}}
                                    />
                                    <div className="card-register cardd ">
                                        <CardHeader>
                                            <CardImg
                                                alt="..."
                                                src={require("assets/img/square-purple-1.png")}
                                            />
                                            <CardTitle tag="h4">Logowanie</CardTitle>
                                        </CardHeader>
                                        <CardBody>
                                            <Grid container className={classes.form}>
                                                <Grid item sm>
                                                    <form noValidate onSubmit={this.handleSubmit}>
                                                        {loading && (
                                                            <CircularProgress className={classes.ladowanie}/>
                                                        )}
                                                        <br/>
                                                        <TextField
                                                            id="email"
                                                            name="email"
                                                            type="email"
                                                            label="email"
                                                            className={classes.textField}
                                                            value={this.state.email}
                                                            helperText={errors.email}
                                                            error={!!errors.email}
                                                            onChange={this.handleChange}
                                                            fullWidth
                                                            InputProps={{
                                                                classes: {
                                                                    underline: classes.underline,
                                                                    input: classes.input
                                                                }
                                                            }}
                                                        />
                                                        <TextField
                                                            id="password"
                                                            name="password"
                                                            type="password"
                                                            label="hasło"
                                                            className={classes.textField}
                                                            value={this.state.password}
                                                            helperText={errors.password}
                                                            error={!!errors.password}
                                                            onChange={this.handleChange}
                                                            fullWidth
                                                            InputProps={{
                                                                classes: {
                                                                    underline: classes.underline,
                                                                    input: classes.input
                                                                }
                                                            }}
                                                        />
                                                        {errors.general && (
                                                            <Typography className={classes.error}>
                                                                {errors.general}
                                                            </Typography>

                                                        )}
                                                        <Button type="submit" variant="contained" color="primary"
                                                                size="md" className={classes.button}>
                                                            Zaloguj
                                                        </Button>
                                                    </form>
                                                </Grid>
                                            </Grid>
                                        </CardBody>
                                        <CardFooter className="login-footer">
                                            Nie masz konta?<br/>
                                            <span className="form-check-sign"/>{" "}
                                            <a
                                                href="/signup"
                                            >
                                                Zarejestruj się
                                            </a>

                                        </CardFooter>
                                    </div>
                                </Col>
                            </Row>
                            <div className="register-bg"/>
                            <div
                                className="square square-1"
                                id="square1"
                                style={{transform: this.state.squares1to6}}
                            />
                            <div
                                className="square square-2"
                                id="square2"
                                style={{transform: this.state.squares1to6}}
                            />
                            <div
                                className="square square-3"
                                id="square3"
                                style={{transform: this.state.squares1to6}}
                            />
                            <div
                                className="square square-4"
                                id="square4"
                                style={{transform: this.state.squares1to6}}
                            />
                            <div
                                className="square square-5"
                                id="square5"
                                style={{transform: this.state.squares1to6}}
                            />
                            <div
                                className="square square-6"
                                id="square6"
                                style={{transform: this.state.squares1to6}}
                            />
                        </Container>
                    </div>
                </div>
            </>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
};


export default withStylee(styles)(Login);