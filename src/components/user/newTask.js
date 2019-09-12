import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from 'react-redux';
import {newTask} from "../../redux/akcje/userActions";
import {
    Button,
} from "reactstrap";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Add';

import Przycisk from '../../util/Buttons';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const styles = {
    TextField: {
        width: '90%',
        left: '10px',
        '& label.Mui-focused': {
            color: '#fc62e5',
        },
        '& label': {
            color: '#fcd2f2',
        },
        '& type=[date]': {
            visibility: 'hidden',
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

class NewTask extends Component {
    state = {
        title: '',
        start: new Date().getDate(),
        end: new Date().getDate(),
        client: '',
        description: '',
        time: 200.0,
        startDate: new Date(),
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

    handleData = date => {
        this.setState({
            startDate: date
        });
    };

    handleSubmit = () => {
        const taskDetails = {
            title: this.state.title,
            start: this.state.start,
            end: this.state.end,
            client: this.state.client,
            description: this.state.description,
            time: this.state.time,
        };
        this.props.newTask(taskDetails);
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
                    <Przycisk tip="Dodaj zlecenie">
                        <EditIcon className="iconh"/>
                    </Przycisk>
                </div>
                <Dialog open={this.state.open}
                        onClose={this.handleClose}
                        maxWidth="sm"
                        fullWidth
                >
                    <DialogTitle className="dialog-Title">Dodaj Zlecenie</DialogTitle>
                    <dialogContent className="dialog-Content">
                        <form>
                            <TextField
                                name="title"
                                type="title"
                                label="Tytuł"
                                rows="3"
                                placeholder="Wpisz tytuł zadania"
                                className={classes.TextField}
                                value={this.state.title}
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
                                name="start"
                                type="date"
                                label="Początek Pracy"
                                placeholder="Wpisz datę początku projektu"
                                className={classes.TextField}
                                value={this.state.start}
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
                                name="end"
                                type="date"
                                label="Koniec Pracy"
                                placeholder="Wpisz datę końca pracy"
                                className={classes.TextField}
                                value={this.state.end}
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
                                name="client"
                                type="client"
                                label="Klient"
                                placeholder="Wpisz Klienta"
                                className={classes.TextField}
                                value={this.state.client}
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
                                name="description"
                                type="description"
                                label="Opis"
                                placeholder="Wpisz Opis"
                                className={classes.TextField}
                                value={this.state.description}
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
                                name="time"
                                type="dd"
                                label="Czas"
                                placeholder=" Wpisz czas potrzebny na realizację"
                                className={classes.TextField}
                                value={this.state.time}
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

NewTask.propTypes = {
    newTask: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
});

export default connect(mapStateToProps, {newTask})(withStyles(styles)(NewTask));