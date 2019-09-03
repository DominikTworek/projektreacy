import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import {paymentNormal, paymentPro} from "../../redux/akcje/userActions";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Przycisk from '../../util/Buttons';
import PaymentIcon from '@material-ui/icons/AttachMoney';
import classnames from "classnames";
import {
    Card,
    CardHeader,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane
} from "reactstrap";
import PaypalExpressBtn from "react-paypal-express-checkout";
import Grid from "@material-ui/core/Grid";
import DialogContent from "@material-ui/core/DialogContent";

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

class Payment extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            errors: {}
        }
    };

    toggleTabs = (e, stateName, index) => {
        e.preventDefault();
        this.setState({
            [stateName]: index
        });
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false})
    };

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            });
        }
    }

    onSuccess = (payment) => {
        this.props.paymentNormal();
        console.log("The payment was succeeded!", payment);
    };

    onSuccess2 = (payment) => {
        this.props.paymentPro();
        console.log("The payment was succeeded!", payment);
    };

    onCancel = (data) => {
        console.log('The payment was cancelled!', data);
    };

    onError = (err) => {
        console.log("Error!", err);
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

        const {classes, UI: {loading}} = this.props;
        return (
            <Fragment>
                <div className={classes.button} onClick={this.handleOpen}>
                    <Przycisk tip="Płatności">
                        <PaymentIcon className="iconh"/>
                    </Przycisk>
                </div>
                <Dialog open={this.state.open}
                        onClose={this.handleClose}
                        maxWidth="sm"
                        fullWidth
                >
                    <DialogTitle className="dialog-Title">Edytuj Dane</DialogTitle>
                    <DialogContent className="dialog-Content">
                        {loading && (
                            <CircularProgress className={classes.ladowanie}/>
                        )}
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
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

Payment.propTypes = {
    paymentNormal: PropTypes.func.isRequired,
    paymentPro: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    paymentNormal, paymentPro
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Payment));