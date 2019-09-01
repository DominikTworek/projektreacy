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
                                        Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({
                                            active: this.state.plainTabs === 2
                                        })}
                                        onClick={e => this.toggleTabs(e, "plainTabs", 2)}
                                        href="#pablo"
                                    >
                                        Updates
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({
                                            active: this.state.plainTabs === 3
                                        })}
                                        onClick={e => this.toggleTabs(e, "plainTabs", 3)}
                                        href="#pablo"
                                    >
                                        History
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
                                I think that’s a responsibility that I have, to push
                                possibilities, to show people, this is the level that things
                                could be at. So when you get something that has the name
                                Kanye West on it, it’s supposed to be pushing the furthest
                                possibilities. I will be the leader of a company that ends
                                up being worth billions of dollars, because I got the
                                answers. I understand culture. I am the nucleus.
                            </p>
                        </TabPane>
                        <TabPane tabId="plainTabs2">
                            <p>
                                I will be the leader of a company that ends up being worth
                                billions of dollars, because I got the answers. I understand
                                culture. I am the nucleus. I think that’s a responsibility
                                that I have, to push possibilities, to show people, this is
                                the level that things could be at. I think that’s a
                                responsibility that I have, to push possibilities, to show
                                people, this is the level that things could be at.
                            </p>
                        </TabPane>
                        <TabPane tabId="plainTabs3">
                            <p>
                                I think that’s a responsibility that I have, to push
                                possibilities, to show people, this is the level that things
                                could be at. I will be the leader of a company that ends up
                                being worth billions of dollars, because I got the answers.
                                I understand culture. I am the nucleus. I think that’s a
                                responsibility that I have, to push possibilities, to show
                                people, this is the level that things could be at.
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