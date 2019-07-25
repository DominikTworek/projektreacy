import React, {Component} from 'react';
import logo from "../../logo.png";
import price from "../../price.png";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Container, FormGroup, Input, Label,
    Modal, ModalBody, ModalHeader,
    Nav,
    Navbar,
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
                <Navbar className="fixed-top bg-dark">
                    <Container>
                        <div className="test"> DAPS</div>
                        <div className="rightnav">
                            <Nav className="justify-content-right">
                                <NavItem>
                                    <text onClick={this.toggleModalMini}>
                                        <NavLink href="#">Logowanie</NavLink>
                                    </text>
                                    <Modal isOpen={this.state.modalMini} toggle={this.toggleModalMini} size="sm">
                                        <ModalHeader className="justify-content-center color-background-dark"
                                                     toggle={this.toggleModalMini}>
                                            <div className="text-color-pink"> Logowanie</div>
                                        </ModalHeader>
                                        <ModalBody className="color-background-dark_pink">
                                            <CardBody className="color-background-dark_pink">
                                                <form>
                                                    <FormGroup>
                                                        <Label for="LoginLogin">Login</Label>
                                                        <Input
                                                            type="text"
                                                            name="LoginLogin"
                                                            placeholder="Wpisz login"
                                                            onChange={this.onChange}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label for="LoginPassword">Hasło</Label>
                                                        <Input
                                                            type="password"
                                                            name="LoginPassword"
                                                            placeholder="Wpisz Hasło"
                                                            autoComplete="off"
                                                            onChange={this.onChange}
                                                        />

                                                    </FormGroup>
                                                    <Button type="submit" value="login"  color="primary" onClick={this.onSubminLogin}>
                                                        Zaloguj
                                                    </Button>
                                                </form>
                                            </CardBody>
                                        </ModalBody>
                                    </Modal>
                                </NavItem>
                                <NavItem>
                                    <text onClick={this.toggleModalLarge}>
                                        <NavLink href="#">Rejestracja</NavLink>
                                    </text>
                                    <Modal isOpen={this.state.modalLarge} toggle={this.toggleModalLarge} size="lg">
                                        <ModalHeader className="justify-content-center color-background-dark"
                                                     toggle={this.toggleModalLarge}>
                                            <div className="text-color-pink"> Rejestracja</div>
                                        </ModalHeader>
                                        <ModalBody className="color-background-dark_pink">
                                            <CardBody className="color-background-dark_pink">
                                                <form>
                                                    <FormGroup>
                                                        <Label for="LoginRegister">Email</Label>
                                                        <Input
                                                            type="text"
                                                            id="LoginRegister"
                                                            placeholder="Email"
                                                        />
                                                    </FormGroup>
                                                    <div className="form-row">
                                                        <FormGroup className="col-md-6">
                                                            <Label for="HasloRegister">Hasło</Label>
                                                            <Input type="password" id="HasloRegister"
                                                                   placeholder="Hasło"/>
                                                        </FormGroup>
                                                        <FormGroup className="col-md-6">
                                                            <Label for="HasloRepeatRegister">Powtórz Hasło</Label>
                                                            <Input type="password" id="HasloRepeatRegister"
                                                                   placeholder="Powtórz hasło"/>
                                                        </FormGroup>
                                                    </div>
                                                    <div className="form-row">
                                                        <FormGroup className="col-md-6">
                                                            <Label for="ImieRegister">Imie</Label>
                                                            <Input type="text" id="ImieRegister"
                                                                   placeholder="Imie"/>
                                                        </FormGroup>
                                                        <FormGroup className="col-md-6">
                                                            <Label for="NazwiskoRegister">Nazwisko</Label>
                                                            <Input type="text" id="NazwiskoRegister"
                                                                   placeholder="Nazwisko"/>
                                                        </FormGroup>
                                                    </div>
                                                    <FormGroup>
                                                        <Label for="inputNazwa">Nazwa Firmy</Label>
                                                        <Input type="text" id="inputNazwa"
                                                               placeholder="Nazwa Firmy"/>
                                                    </FormGroup>
                                                    <div className="form-row">
                                                        <FormGroup className="col-md-6">
                                                            <Label for="MiastoRegister">Miasto</Label>
                                                            <Input type="text" id="MiastoRegister"
                                                                   placeholder="Miasto"/>
                                                        </FormGroup>
                                                        <FormGroup className="col-md-4">
                                                            <Label for="WojewodztwoRegister">Województwo</Label>
                                                            <Input type="text" id="WojewodztwoRegister"
                                                                   placeholder="Województwo"/>
                                                        </FormGroup>
                                                        <FormGroup className="col-md-2">
                                                            <Label for="inputZip">Zip</Label>
                                                            <Input
                                                                type="text" id="inputZip" placeholder="00-000"/>
                                                        </FormGroup>
                                                    </div>
                                                    <FormGroup check>
                                                        <Label className="form-check-label">
                                                            <Input className="form-check-input" type="checkbox"
                                                                   value=""/>
                                                            Akceptuję regulamin
                                                            <span className="form-check-sign">
                                                                <span className="check"/>
                                                            </span>
                                                        </Label>
                                                        <a href="/Regulamin"> Regulamin</a>
                                                    </FormGroup>
                                                    <Button type="submit" color="primary">Dalej</Button>
                                                </form>
                                            </CardBody>
                                        </ModalBody>
                                    </Modal>
                                </NavItem>
                            </Nav>
                        </div>
                    </Container>
                </Navbar>
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