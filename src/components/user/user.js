import React, {Component} from 'react';
import classnames from "classnames";
import {Col, Container, Nav, Navbar, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vertical: 1
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
            <div className="App">
                <Navbar className="fixed-top bg-dark">
                    <Container>
                        <div className="test"> DAPS</div>
                        <div className="rightnav">
                            <Nav className="justify-content-right">
                                <NavItem>
                                    <NavLink href="#">Wyloguj</NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                    </Container>
                </Navbar>
                <Row>
                    <Col md="4">
                        <div className="container">
                            <div className="row profile">
                                <div className="profile-sidebar">

                                    <div className="profile-userpic">
                                        <img
                                            src="https://i.imgur.com/cEgMnfn.jpg"
                                            className="img-responsive" alt=""/>
                                    </div>

                                    <div className="profile-usertitle">
                                        <div className="profile-usertitle-name">
                                            Nick
                                        </div>
                                        <div className="profile-usertitle-job">
                                            Developer
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Nav className="nav-pills-primary flex-column left-menu-user" pills>
                            <NavItem>
                                <NavLink
                                    className={classnames({
                                        active: this.state.vertical === 1
                                    })}
                                    onClick={e => this.toggleTabs(e, "vertical", 1)}
                                    href="#pablo"
                                >
                                    Konto
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({
                                        active: this.state.vertical === 2
                                    })}
                                    onClick={e => this.toggleTabs(e, "vertical", 2)}
                                    href="#pablo"
                                >
                                    Projekt
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({
                                        active: this.state.vertical === 3
                                    })}
                                    onClick={e => this.toggleTabs(e, "vertical", 3)}
                                    href="#pablo"
                                >
                                    Wiadomości
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col md="8">
                        <TabContent activeTab={"vertical" + this.state.vertical} className="right-menu-user">
                            <TabPane tabId="vertical1">
                                <h5> KONTO </h5>
                                <p className="text-left text-color-pink">
                                    <blockquote className="blockquote blockquote-skills">
                                    <h7>
                                        Umiejętności
                                    </h7><br/><br/>
                                    <div className="progress-container progress-primary progresik">
                                        <span className="progress-badge  pasek-postepu">Java</span>
                                        <div className="progress pasek-postepu">
                                            <div className="progress-bar postep" role="progressbar"
                                                 aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
                                                <span className="progress-value  pasek-procenty">50%</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="progress-container progress-success progresik">
                                        <span className="progress-badge  pasek-postepu">SQL</span>
                                        <div className="progress pasek-postepu">
                                            <div className="progress-bar postep" role="progressbar"
                                                 aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
                                                <span className="progress-value  pasek-procenty">50%</span>
                                            </div>
                                        </div>
                                    </div>
                                    </blockquote>
                                </p>
                                <p className="text-left text-color-pink">
                                    <blockquote className="blockquote blockquote-date">
                                        <h7>
                                            Dane
                                        </h7><br/><br/>
                                        <blockquote className="blockquote date-user">
                                        <b>Imie:</b> Imie <br/>
                                        </blockquote>
                                        <blockquote className="blockquote date-user">
                                        <b>Nazwisko:</b> Nazwisko <br/>
                                        </blockquote>
                                        <blockquote className="blockquote date-user">
                                        <b>Stanowisko:</b> Java Developer <br/>
                                        </blockquote>
                                        <blockquote className="blockquote date-user">
                                        <b>Wolne:</b> Nie <br/>
                                        </blockquote>
                                        <blockquote className="blockquote date-user">
                                        <b>Projekt:</b> Tak <br/>
                                        </blockquote>
                                        <blockquote className="blockquote date-user">
                                            <b>Pensja:</b> 4000zł <br/>
                                        </blockquote>
                                    </blockquote>
                                    <blockquote className="blockquote blockquote-date">
                                    Powiadomienia:<br/>
                                        <small className="text-muted">Projekt</small>
                                        <p className="lead text-muted">
                                            Zostałeś przydzielony do projektu. Sprawdź zakładkę "Projekt" po lewej stronie.
                                        </p>

                                    </blockquote>
                                </p>
                            </TabPane>
                            <TabPane tabId="vertical2">
                                <h5> PROJEKT </h5>
                                <blockquote className="blockquote text-center">
                                    <p className="mb-0">Nazwa projektu</p>
                                    <small className="text-muted">Celem projektu jest: Cele projektu powinny być spoiwem łączącym najwyższą jakość podejmowanych działań, w optymalnym czasie realizacji, osiągającym najlepsze rezultaty i efekty, posiadające odpowiednie zasoby oraz uwzględniające możliwości finansowe przeznaczone na realizację danego projektu "Jasne przedstawienie tego czego oczekujemy, pozwala na doprecyzowanie punktu w jakim się obecnie znajdujemy w odniesieniu do punktu w, którym byliśmy i do jakiego zmierzamy. Przejrzyście określone cele w projekcie, pozwalają zidentyfikować u członków zespołu powstanie większej motywacji do działania. Cel charakteryzuje sytuację pożądaną na miarę sił i możliwości wykonawcy.” </small>
                                </blockquote>
                                <blockquote className="blockquote text-center">
                                    <p className="mb-0">Twoje Zadania</p>
                                    <ul className="list-group">
                                        <li className="text-left li-work">Zadanko 1</li>
                                        <li className="text-left li-work">Zadanko 2</li>
                                        <li className="text-left li-work">Zadanko 3</li>
                                        <li className="text-left li-work">Zadanko 4</li>
                                    </ul>
                                    <button type="button" className="btn btn-primary" data-toggle="modal"
                                            data-target="#exampleModalLong">
                                        Wybierz zadanie
                                    </button>
                                    <div className="progress-container progress-info progresik">
                                        <span className="progress-badge  pasek-postepu">Postęp</span>
                                        <div className="progress pasek-postepu">
                                            <div className="progress-bar postep" role="progressbar"
                                                 aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
                                                <span className="progress-value">50%</span>
                                            </div>
                                        </div>
                                    </div>
                                </blockquote>
                                <blockquote className="blockquote text-center">
                                    <p className="mb-0">Zespół</p>
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th className="text-center">#</th>
                                            <th>Nick</th>
                                            <th>Pozycja w firmie</th>
                                            <th>Wykonywane zadanie</th>
                                            <th className="text-right">% wykonanych zadań</th>
                                            <th className="text-right">Akcje</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className="text-center">1</td>
                                            <td>Nick1</td>
                                            <td>Develop</td>
                                            <td>Logika na stronie</td>
                                            <td className="text-right">99,225%</td>
                                            <td className="td-actions text-right">
                                                <button type="button" rel="tooltip"
                                                        className="btn btn-info btn-sm btn-round btn-icon">
                                                    <i className="tim-icons icon-chat-33"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">2</td>
                                            <td>Nick2</td>
                                            <td>Design</td>
                                            <td>Tworzenie wyglądu okna użytkownika</td>
                                            <td className="text-right"> 89,241%</td>
                                            <td className="td-actions text-right">
                                                <button type="button" rel="tooltip"
                                                        className="btn btn-info btn-sm btn-round btn-icon">
                                                    <i className="tim-icons icon-chat-33"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">3</td>
                                            <td>Nick3</td>
                                            <td>Design</td>
                                            <td>Tworzenie wyglądu okna głównego</td>
                                            <td className="text-right">92,144%</td>
                                            <td className="td-actions text-right">
                                                <button type="button" rel="tooltip"
                                                        className="btn btn-info btn-sm btn-round btn-icon">
                                                    <i className="tim-icons icon-chat-33"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </blockquote>
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default User