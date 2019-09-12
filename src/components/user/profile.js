import {Card, CardHeader} from "reactstrap";
import EditIcon from "@material-ui/icons/Edit";
import MuiLink from "@material-ui/core/Link/Link";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import React, {Component, Fragment} from "react";
import dayjs from "dayjs";
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import TypeIcon from '@material-ui/icons/MonetizationOn'
import CalendarToday from '@material-ui/icons/CalendarToday';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import {logoutUser, uploadImage} from "../../redux/akcje/userActions";
import PropTypes from "prop-types";
import EditProfile from './editProfile';
import Przycisk from "../../util/Buttons";

const styless = (theme) => ({
    profilee: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            },
            '& button:hover': {
                color: 'pink',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    },
    buttonLogOff: {
        float: 'left'
    }
});


class Profile extends Component {
    handleDodawanieZdjecia = (event) => {
        const zdjecie = event.target.files[0];
        const formData = new FormData();
        formData.append('zdjecie', zdjecie, zdjecie.name);
        this.props.uploadImage(formData);
    };
    handleEdycjaZdjecia = () => {
        const fileInput = document.getElementById('dodawanieZdjecia');
        fileInput.click();
    };
    handleWyloguj = () => {
        this.props.logoutUser();
    };

    render() {
        const {
            classes
        } = this.props;
        return (
            <Card className="profile card-coin card-plain ">
                <CardHeader>
                    <div className={classes.profilee}>
                        <div className="image-wrapper">
                            <img
                                alt="..."
                                className="img-center img-fluid rounded-circle"
                            />

                            <input
                                type="file"
                                id="dodawanieZdjecia"
                                hidden="hidden"
                                onChange={this.handleDodawanieZdjecia}
                            />
                            <Przycisk tip="Edytuj swoje zdjęcie profilowe" onClick={this.handleEdycjaZdjecia}>
                                <EditIcon className="iconh"/>
                            </Przycisk>

                        </div>
                        <hr/>
                        <div className='profile-details'>
                            <h4 className="title">Informacje</h4>
                            <hr/>
                            <hr/>
                            <CalendarToday className="icon"/>{''}
                            <hr/>

                        </div>
                        <div className={classes.buttonLogOff}>
                        <Przycisk tip="Wyloguj Się" onClick={this.handleWyloguj}>
                            <KeyboardReturn className="iconh"/>
                        </Przycisk>
                        </div>
                        <div className="edytuj-przycisk">
                            <EditProfile/>
                        </div>
                    </div>
                </CardHeader>
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {logoutUser, uploadImage};

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styless)(Profile))
