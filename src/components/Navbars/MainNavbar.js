import React, {Component, Fragment} from "react";
import {Link} from "react-router-dom";
import {
    Collapse,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col
} from "reactstrap";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Przycisk from '../../util/Buttons';
import AddIcon from '@material-ui/icons/Add';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ConfigIcon from '@material-ui/icons/BrightnessLow';
import PaymentIcon from '@material-ui/icons/AttachMoney';
import withStyles from "@material-ui/core/styles/withStyles";
import EditPassword from "../user/editPassword";

const styles = {
    'icon': {
        color: '#dbaee1',
    },
    'icon:hover': {
        color: '#81e177',
        backgroundColor: 'red'
    }
};

class MainNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseOpen: false,
            color: "navbar-transparent"
        };
    }

    componentDidMount() {
        window.addEventListener("scroll", this.changeColor);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.changeColor);
    }

    changeColor = () => {
        if (
            document.documentElement.scrollTop > 99 ||
            document.body.scrollTop > 99
        ) {
            this.setState({
                color: "bg-info"
            });
        } else if (
            document.documentElement.scrollTop < 100 ||
            document.body.scrollTop < 100
        ) {
            this.setState({
                color: "navbar-transparent"
            });
        }
    };
    toggleCollapse = () => {
        document.documentElement.classList.toggle("nav-open");
        this.setState({
            collapseOpen: !this.state.collapseOpen
        });
    };
    onCollapseExiting = () => {
        this.setState({
            collapseOut: "collapsing-out"
        });
    };
    onCollapseExited = () => {
        this.setState({
            collapseOut: ""
        });
    };

    render() {
        const {authenticated} = this.props;
        return (
            <Navbar
                className={"fixed-top " + this.state.color}
                color-on-scroll="100"
                expand="lg"
            >
                <Container>
                    <div className="navbar-translate">
                        <NavbarBrand
                            data-placement="bottom"
                            to="/"
                            tag={Link}
                        >
                            <span>DAPS• </span>
                            Student Project
                        </NavbarBrand>
                        <button
                            aria-expanded={this.state.collapseOpen}
                            className="navbar-toggler navbar-toggler"
                            onClick={this.toggleCollapse}
                        >

                        </button>
                    </div>
                    <Collapse
                        className={"justify-content-end " + this.state.collapseOut}
                        navbar
                        isOpen={this.state.collapseOpen}
                        onExiting={this.onCollapseExiting}
                        onExited={this.onCollapseExited}
                    >
                        <div className="navbar-collapse-header">
                            <Row>
                                <Col className="collapse-close text-right">
                                    <button
                                        aria-expanded={this.state.collapseOpen}
                                        className="navbar-toggler"
                                        onClick={this.toggleCollapse}
                                    >
                                        <i className="tim-icons icon-simple-remove"/>
                                    </button>
                                </Col>
                            </Row>
                        </div>
                        <Nav navbar>
                            {authenticated ? (
                                <Fragment>
                                    <NavItem>
                                        <Przycisk tip="Dodaj zlecenie">
                                            <AddIcon className="iconh">
                                            </AddIcon>
                                        </Przycisk>
                                    </NavItem>
                                    <NavItem>
                                        <Przycisk tip="Powiadomienia">
                                            <NotificationsIcon className="iconh">
                                            </NotificationsIcon>
                                        </Przycisk>
                                    </NavItem>
                                    <NavItem>
                                            <div className="iconh">
                                                 <EditPassword/>
                                            </div>
                                    </NavItem>
                                    <NavItem>
                                        <Przycisk tip="Płatności">
                                            <PaymentIcon className="iconh">
                                            </PaymentIcon>
                                        </Przycisk>
                                    </NavItem>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <NavItem>
                                        <NavLink tag={Link} to="/login">
                                            Logowanie
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to="/signup">
                                            Rejestracja
                                        </NavLink>
                                    </NavItem>
                                </Fragment>
                            )}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}

MainNavbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(withStyles(styles)(MainNavbar));
