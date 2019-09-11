import withStylee from '@material-ui/core/styles/withStyles';
import '../Css/register.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import {connect} from 'react-redux';
import {loginUser} from '../../redux/akcje/userActions';
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

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            });
        }
    }
    handleSubmit = (event) => {
        const loginRequest = Object.assign({}, this.state);

        login(loginRequest)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                Alert.success("Zostałeś zalogowany!");
                const userData = {
                    email: this.state.email,
                    password: this.state.password
                };
                this.props.loginUser(userData, this.props.history);
                this.props.history.push("/user");
            }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Coś poszło nie tak, spróbuj ponownie!');
        });
        event.preventDefault();
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const {
            classes,
            UI: { loading }
        } = this.props;
        const {errors} = this.state;
        return (
            <>
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
                                            <p>Nie masz konta?<br/>
                                            <span className="form-check-sign"/>{" "}
                                            <a
                                                href="/signup"
                                            >
                                                Zarejestruj się
                                            </a>
                                            </p>
                                            <p>
                                                Nie pamiętasz hasła?<br/>
                                                <span className="form-check-sign"/>{" "}
                                                <a
                                                    href="/forget"
                                                >
                                                    Przypomnij hasło
                                                </a>
                                            </p>

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
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
};


export default connect(mapStateToProps, mapActionsToProps)(withStylee(styles)(Login));