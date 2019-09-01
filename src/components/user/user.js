import React, {Component} from 'react';
import '../../App.css';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import {connect} from "react-redux";
import Button from '@material-ui/core/Button';
import CircularProgress from "@material-ui/core/CircularProgress";
import Profile from './profile';


const styless = (theme) => ({
});




class User extends Component {
    render() {
        const {
            classes, user: {
                loading,
                authenticated
            }
        } = this.props;

        return !loading ? (authenticated ? (
            <div className="App">
                <div className="page-header">
                    <Grid container spacing={10}>
                        <Grid item sm={8} xs={12}>
                            Text
                        </Grid>
                        <Grid item sm={3} xs={12}>
                            <Profile/>
                        </Grid>
                        <Grid item sm={1} xs={12}>
                        </Grid>
                    </Grid>
                </div>
            </div>
        ) : (
            <div className="App">
                <div className="page-header">
                    <Grid container spacing={10}>
                        <Grid item sm={12} xs={12}>
                            Nie znaleziono profilu, Proszę zaloguj się ponownie.

                            <Button variant="contained" color="primary" component={Link} to="/login"
                                    size="medium" className={classes.button}>
                                Zaloguj
                            </Button>
                            <Button variant="contained" color="primary" component={Link} to="/signup"
                                    size="medium" className={classes.button}>
                                Zarejestruj się
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>

        )) : (<div>{loading && (
            <CircularProgress className={classes.ladowanie}/>
        )}</div>);
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {};

User.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styless)(User))