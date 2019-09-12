import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from 'react-redux';
import {addDetails} from "../../redux/akcje/userActions";
import {
    Button, Card, CardBody, CardHeader, Nav, NavItem, NavLink, TabContent, TabPane,
} from "reactstrap";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/AttachMoney';

import Przycisk from '../../util/Buttons';
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import classnames from "classnames";
import Grid from "@material-ui/core/Grid";
import PaypalExpressBtn from "react-paypal-express-checkout";

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

class NewPayment extends Component {
    state = (credentials) => ({
        id: '',
        name: '',
        email: '',
        salary: '',
        hireFrom: '',
        expLevel: '',
        provider: '',
        freeVersion: '',
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

    onSuccess = (payment) => {
        const userDetails = {
            id: this.state.id,
            name: this.state.name,
            email: this.state.email,
            provider: this.state.provider,
            salary: this.state.salary,
            hireFrom: this.state.hireFrom,
            expLevel: this.state.expLevel,
            freeVersion: true,
        };
        console.log(userDetails);
        this.props.addDetails(userDetails);
        this.handleClose();
        console.log("The payment was succeeded!", payment);
    };

    onSuccess2 = (payment) => {
        const userDetails = {
            id: this.state.id,
            name: this.state.name,
            email: this.state.email,
            provider: this.state.provider,
            salary: this.state.salary,
            hireFrom: this.state.hireFrom,
            expLevel: this.state.expLevel,
            freeVersion: true,
        };
        console.log(userDetails);
        this.props.addDetails(userDetails);
        this.handleClose();
        console.log("The payment was succeeded!", payment);
    };

    onCancel = (data) => {
        console.log('The payment was cancelled!', data);
    };

    onError = (err) => {
        console.log("Error!", err);
    };

    toggleTabs = (e, stateName, index) => {
        e.preventDefault();
        this.setState({
            [stateName]: index
        });
    };

    render() {
        let env = 'sandbox';
        let currency = 'PLN';
        let total = 15.00;
        let total2 = 30.00;

        const client = {
            sandbox:    'ARV0_RTSPOeR-6XyErK7XaI6Ta0G-8LPuju2TvSL24v8Y_SK2NXFlVsVnIfX_HzXxsNF1Q46nsPZmz5O',
            production: 'ENebwLeWmi7aR7PFuefplxSP7TRw0unLfd-RxH8Iv6BHaNq8yg8SfBZ5Bq1kzkUbS3y45marz47OUCC1',
        };

        const {classes} = this.props;
        return (
            <Fragment>
                <div className={classes.button} onClick={this.handleOpen}>
                    <Przycisk tip="Płatności">
                        <EditIcon className="iconh"/>
                    </Przycisk>
                </div>
                <Dialog open={this.state.open}
                        onClose={this.handleClose}
                        maxWidth="sm"
                        fullWidth
                >
                    <DialogTitle className="dialog-Title">Edytuj Dane</DialogTitle>
                    <DialogContent className="dialog-Content">
                        <Card className="card-nav-tabs card-plain">
                            <CardHeader className="card-header-danger">
                                {/* colors: "header-primary", "header-info", "header-success", "header-warning", "header-danger" */}
                                <div className="nav-tabs-navigation">
                                    <div className="nav-tabs-wrapper">
                                        <Nav data-tabs="tabs" tabs>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({
                                                        active: this.state.plainTabs === 1
                                                    })}
                                                    onClick={e => this.toggleTabs(e, "plainTabs", 1)}
                                                >
                                                    PayPal
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <TabContent className="text-center" activeTab={"plainTabs" + this.state.plainTabs}>
                                    <TabPane tabId="plainTabs1">
                                        <Grid container spacing={10}>
                                            <Grid item sm={6} xs={12}>
                                                15zł NORMAL
                                                <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={this.onError} onSuccess={this.onSuccess} onCancel={this.onCancel} />
                                            </Grid>
                                            <Grid item sm={6} xs={12}>
                                                30zł PRO
                                                <PaypalExpressBtn env={env} client={client} currency={currency} total={total2} onError={this.onError} onSuccess={this.onSuccess2} onCancel={this.onCancel} />
                                            </Grid>
                                        </Grid>
                                    </TabPane>
                                </TabContent>
                            </CardBody>
                        </Card>
                    </DialogContent>
                    <DialogActions className="dialog-Actions">
                        <Button type="moj" onClick={this.handleClose} color="primary">
                            Anuluj
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

NewPayment.propTypes = {
    addDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    credentials: state.user,
});

export default connect(mapStateToProps, {addDetails})(withStyles(styles)(NewPayment));