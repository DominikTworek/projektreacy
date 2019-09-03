import React, {Component} from "react";
import withStyles from '@material-ui/core/styles/withStyles';
import {connect} from "react-redux";
import PropTypes from "prop-types";
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


const styles = {
    root: {
        backgroundColor: 'red',
        width: '500px',
    }
};

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plainTabs: 1
        };
    }

    toggleTabs = (e, stateName, index) => {
        e.preventDefault();
        this.setState({
            [stateName]: index
        });
    };

    render() {
        const onSuccess = (payment) => {
            console.log("The payment was succeeded!", payment);
        };

        const onSuccess2 = (payment) => {
            console.log("The payment was succeeded!", payment);
        };

        const onCancel = (data) => {
            console.log('The payment was cancelled!', data);
        };

        const onError = (err) => {
            console.log("Error!", err);
        };

        let env = 'sandbox';
        let currency = 'PLN';
        let total = 15.00;
        let total2 = 30.00;

        const client = {
            sandbox:    'ARV0_RTSPOeR-6XyErK7XaI6Ta0G-8LPuju2TvSL24v8Y_SK2NXFlVsVnIfX_HzXxsNF1Q46nsPZmz5O',
            production: 'ENebwLeWmi7aR7PFuefplxSP7TRw0unLfd-RxH8Iv6BHaNq8yg8SfBZ5Bq1kzkUbS3y45marz47OUCC1',
        };

        return (
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
                                        href="#pablo"
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
                            <p>
                                <Grid container spacing={10}>
                                    <Grid item sm={6} xs={12}>
                                        15zł NORMAL
                                        <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        30zł PRO
                                        <PaypalExpressBtn env={env} client={client} currency={currency} total={total2} onError={onError} onSuccess={onSuccess2} onCancel={onCancel} />
                                    </Grid>
                                </Grid>

                            </p>
                        </TabPane>
                    </TabContent>
                </CardBody>
            </Card>
        )
    }
};

Payment.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {};


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Payment))