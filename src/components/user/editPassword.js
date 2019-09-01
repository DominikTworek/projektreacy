import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import {changePassword} from "../../redux/akcje/userActions";
import {
    Button,
} from "reactstrap";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Przycisk from '../../util/Buttons';
import ConfigIcon from '@material-ui/icons/BrightnessLow';

const styles = {
    TextField: {
        width: '90%',
        left: '10px',
        '& label.Mui-focused': {
            color: '#fc62e5',
        },
        '& label': {
            color: '#fcd3fa',
        },
        '& label.MuiInputLabel-filled': {
            color: '#fcd3fa',
        },
        error: {
            marginTop: '10px',
            color: '#fc2887',
            fontSize: '0.7am'
        },
    },
    input: {
        color: 'white',
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
        float: 'right'
    }
};

class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            password: '',
            confirmPassword: '',
            open: false,
            errors: {}
        }
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false})
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const userPassword = {
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };
        this.props.changePassword(userPassword, this.props.history);
        //this.handleClose();
    };

    render() {

        const {classes, UI: {loading}} = this.props;
        const {errors} = this.state;
        return (
            <Fragment>
                <div className={classes.button} onClick={this.handleOpen}>
                    <Przycisk tip="Edytuj Dane">
                        <ConfigIcon className="iconh"/>
                    </Przycisk>
                </div>
                <Dialog open={this.state.open}
                        onClose={this.handleClose}
                        maxWidth="sm"
                        fullWidth
                >
                    <DialogTitle className="dialog-Title">Edytuj Dane</DialogTitle>
                    <dialogContent className="dialog-Content">
                        {loading && (
                            <CircularProgress className={classes.ladowanie}/>
                        )}
                        <form>
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
                            <TextField
                                id="confirmPassword"
                                name="confirmPassword"
                                type="Password"
                                label="Powtórz hasło"
                                className={classes.textField}
                                value={this.state.confirmPassword}
                                helperText={errors.confirmPassword}
                                error={!!errors.confirmPassword}
                                onChange={this.handleChange}
                                fullWidth
                                InputProps={{
                                    classes: {
                                        underline: classes.underline,
                                        input: classes.input
                                    }
                                }}
                            />
                        </form>
                    </dialogContent>
                    <DialogActions className="dialog-Actions">
                        <Button type="moj" onClick={this.handleClose} color="primary">
                            Anuluj
                        </Button>
                        <Button type="moj" onClick={this.handleSubmit} color="primary">
                            Zapisz
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EditProfile.propTypes = {
    changePassword: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    changePassword
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditProfile));