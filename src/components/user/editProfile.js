import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from 'react-redux';
import {editUserDetails} from "../../redux/akcje/userActions";
import {
    Button,
} from "reactstrap";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import Przycisk from '../../util/Buttons';

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
    state = {
        name: '',
        surname: '',
        website: '',
        location: '',
        open: false
    };

    handleOpen = () => {
        this.setState({open: true});
        this.mapUserDetailsToState(this.props.credentials);

    };

    handleClose = () => {
        this.setState({open: false})
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = () => {
        const userDetails = {
            name: this.state.name,
            surname: this.state.surname,
            website: this.state.website,
            location: this.state.location
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
    };

    mapUserDetailsToState = (credentials) => {
        this.setState({
        })
    };

    componentDidMount() {
        const {credentials} = this.props;
        this.mapUserDetailsToState(credentials);
    }

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <div className={classes.button} onClick={this.handleOpen}>
                    <Przycisk tip="Edytuj Dane">
                        <EditIcon className="iconh"/>
                    </Przycisk>
                </div>
                <Dialog open={this.state.open}
                        onClose={this.handleClose}
                        maxWidth="sm"
                        fullWidth
                >
                    <DialogTitle className="dialog-Title">Edytuj Dane</DialogTitle>
                    <dialogContent className="dialog-Content">
                        <form>
                            <TextField
                                name="name"
                                type="name"
                                label="Imie"
                                rows="3"
                                placeholder="Twoje Imie"
                                className={classes.TextField}
                                value={this.state.name}
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
                                name="surname"
                                type="surname"
                                label="Nazwisko"
                                placeholder="Twoje Nazwisko"
                                className={classes.TextField}
                                value={this.state.surname}
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
                                name="website"
                                type="website"
                                label="Strona"
                                placeholder="Twoja Strona(Github)"
                                className={classes.TextField}
                                value={this.state.website}
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
                                name="location"
                                type="location"
                                label="Lokalizacja"
                                placeholder="Twoja miejsce zamieszkania(lokalizacja)"
                                className={classes.TextField}
                                value={this.state.location}
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
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
});

export default connect(mapStateToProps, {editUserDetails})(withStyles(styles)(EditProfile));