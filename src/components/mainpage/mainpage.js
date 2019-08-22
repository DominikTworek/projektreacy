import React, {Component} from 'react';
import logo from "../../logo.png";
import price from "../../price.png";
import ExamplesNavbar from "components/Navbars/MainNavbar.js";
import {
    Card,
    CardBody,
    CardHeader,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from "reactstrap";



class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plainTabs: 1,
            modalMini: false,
            modalLarge: false,
        };
        this.toggleModalMini = this.toggleModalMini.bind(this);
        this.toggleModalLarge = this.toggleModalLarge.bind(this);
    }

    toggleModalMini() {
        this.setState({
            modalMini: !this.state.modalMini
        });
    }

    toggleModalLarge() {
        this.setState({
            modalLarge: !this.state.modalLarge
        });
    }

    toggleTabs = (e, stateName, index) => {
        e.preventDefault();
        this.setState({
            [stateName]: index
        });
    };

    render() {
        function classnames(param) {
            return "#BA54F5";
        }

        return (
            <div className="App">
                <ExamplesNavbar />
                <div className="main-body">
                    <div className="main-text">
                        <h3 id="content"><p>
                            Oszczędzaj czas i pieniądze korzystając z naszej aplikacji.

                        </p>
                            <small className="text-muted">
                                Przydzielaj pracowników do zleceń w kilka sekund!
                            </small>
                        </h3>
                    </div>
                    <img src={logo} className="img-fluid logo" alt="logo"/>
                    <img src={price} className="img-fluid img-price " alt="price"/>
                    <div className="Site_Text_left">

                        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                        <Card className="card-nav-tabs card-plain">
                            <CardHeader className="card-header-danger">
                                {/* colors: "header-primary", "header-info", "header-success", "header-warning", "header-danger" */}
                                <div className="nav-tabs-navigation">
                                    <div className="nav-tabs-wrapper">
                                        <Nav className="navsd">
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({
                                                        active: this.state.plainTabs === 1
                                                    })}
                                                    onClick={e => this.toggleTabs(e, "plainTabs", 1)}
                                                    href=""
                                                >
                                                    Darmowy
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({
                                                        active: this.state.plainTabs === 2
                                                    })}
                                                    onClick={e => this.toggleTabs(e, "plainTabs", 2)}
                                                    href=""
                                                >
                                                    Normal
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({
                                                        active: this.state.plainTabs === 3
                                                    })}
                                                    onClick={e => this.toggleTabs(e, "plainTabs", 3)}
                                                    href=""
                                                >
                                                    PRO
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <TabContent className="text-center" activeTab={"plainTabs" + this.state.plainTabs}>
                                    <TabPane tabId="plainTabs1">
                                        <p>Możliwość stworzenia do 10 kont dla pracowników.</p>
                                        <p>Możliwość dopasowywania zadań do pracowników.</p>
                                        <p>Sprawdzanie deadline.</p>
                                        <p>Sprawdzanie postępów prac.</p>
                                    </TabPane>
                                    <TabPane tabId="plainTabs2">
                                        <p>Możliwość stworzenia do 20 kont dla pracownikoów.</p>
                                        <p>Możliwość dopasowywania zadań do pracownikoów.</p>
                                        <p>Sprawdzanie deadline.</p>
                                        <p>Sprawdzanie postępów prac.</p>
                                        <p>Aktywny system automatycznego dopasowywania pracowników do zadań</p>
                                    </TabPane>
                                    <TabPane tabId="plainTabs3">
                                        <p>Możliwość stworzenia do 100 kont dla pracownikoów.</p>
                                        <p>Możliwość dopasowywania zadań do pracownikoów.</p>
                                        <p>Sprawdzanie deadline.</p>
                                        <p>Sprawdzanie postępów prac.</p>
                                        <p>Aktywny system automatycznego dopasowywania pracowników do zadań</p>
                                    </TabPane>
                                </TabContent>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default MainPage