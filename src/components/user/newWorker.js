import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from 'react-redux';
import {addDetails} from "../../redux/akcje/userActions";
import {
    Button,
} from "reactstrap";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/SupervisedUserCircle';

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
    state = (credentials) => ({
        id: '',
        name: '',
        email: '',
        salary: '',
        hireFrom: '',
        expLevel: '',
        provider: '',
        open: false
    });

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
            id: this.state.id,
            name: this.state.name,
            email: this.state.email,
            provider: this.state.provider,
            salary: this.state.salary,
            hireFrom: this.state.hireFrom,
            expLevel: this.state.expLevel,
        };
        console.log(userDetails);
        this.props.addDetails(userDetails);
        this.handleClose();
    };

    mapUserDetailsToState = (credentials) => {
        this.setState({
            id: credentials.id ? credentials.id : '',
            name: credentials.name ? credentials.name : '',
            email: credentials.email ? credentials.email : '',
            salary: credentials.salary ? credentials.salary : '',
            hireFrom: credentials.hireFrom ? credentials.hireFrom : '',
            expLevel: credentials.expLevel ? credentials.expLevel : '',
            provider: credentials.provider ? credentials.provider : '',
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
                    <Przycisk tip="Dodaj użytkownika">
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
                                name="salary"
                                type="salary"
                                label="Pensja"
                                rows="3"
                                placeholder="Pensja Pracownika"
                                className={classes.TextField}
                                value={this.state.salary}
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
                                name="hireFrom"
                                type="hireFrom"
                                label="Zatrudniony od"
                                placeholder="Wpisz od kiedy zatrudniony"
                                className={classes.TextField}
                                value={this.state.hireFrom}
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
                                name="expLevel"
                                type="expLevel"
                                label="Doświadczenie"
                                placeholder="Doświadczenie Pracownika"
                                className={classes.TextField}
                                value={this.state.expLevel}
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
    addDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    credentials: state.user,
});

export default connect(mapStateToProps, {addDetails})(withStyles(styles)(EditProfile));