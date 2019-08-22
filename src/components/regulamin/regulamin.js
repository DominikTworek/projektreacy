import React, {Component} from 'react';
import classnames from "classnames";
import ExamplesNavbar from "components/Navbars/RegisterNavbar.jsx";
// reactstrap components
import {
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Row,
    Col
} from "reactstrap";

class Regulamin extends Component {
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
            <>
                <ExamplesNavbar />
                <blockquote className="blockquote">
                    <p className="mb-0">Regulamin</p>
                </blockquote>
                <Row>
                    <Col md="4">
                        <Nav className="nav-pills-primary flex-column left-menu-user" pills>
                            <NavItem>
                                <NavLink
                                    className={classnames({
                                        active: this.state.vertical === 1
                                    })}
                                    onClick={e => this.toggleTabs(e, "vertical", 1)}
                                    href="#pablo"
                                >
                                    1. Postanowienia ogólne
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
                                    2. Definicje
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
                                    3. Rodzaj i zakres usług elektronicznych
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({
                                        active: this.state.vertical === 4
                                    })}
                                    onClick={e => this.toggleTabs(e, "vertical", 4)}
                                    href="#pablo"
                                >
                                    4. Warunki świadczenia i zawierania umów o świadczenie usług elektronicznych
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({
                                        active: this.state.vertical === 5
                                    })}
                                    onClick={e => this.toggleTabs(e, "vertical", 5)}
                                    href="#pablo"
                                >
                                    5. Warunki rozwiązania umów o świadczenie usług elektronicznych
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({
                                        active: this.state.vertical === 6
                                    })}
                                    onClick={e => this.toggleTabs(e, "vertical", 6)}
                                    href="#pablo"
                                >
                                    6. Tryb postępowania reklamacyjnego
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({
                                        active: this.state.vertical === 7
                                    })}
                                    onClick={e => this.toggleTabs(e, "vertical", 7)}
                                    href="#pablo"
                                >
                                    7. Własność intelektualna
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({
                                        active: this.state.vertical === 8
                                    })}
                                    onClick={e => this.toggleTabs(e, "vertical", 8)}
                                    href="#pablo"
                                >
                                    8. Postanowienia końcowe
                                </NavLink>
                            </NavItem>


                        </Nav>
                    </Col>
                    <Col md="8">
                        <TabContent activeTab={"vertical" + this.state.vertical} className="right-menu-user">
                            <TabPane tabId="vertical1">
                                <h5> POSTANOWIENIA OGÓLNE </h5>
                                <p className="text-left text-color-white-pink">
                                    1. Strona daps działa na zasadach określonych w niniejszym Regulaminie.<br/>
                                    2. Regulamin określa rodzaje i zakres usług świadczonych drogą elektroniczną przez
                                    Stronę daps, zasady świadczenia tych usług, warunki zawierania i rozwiązywania umów
                                    o świadczenie usług drogą elektroniczną, a także tryb postępowania
                                    reklamacyjnego.<br/>
                                    3. Regulamin określa rodzaje i zakres usług świadczonych drogą elektroniczną przez
                                    Stronę daps, zasady świadczenia tych usług, warunki zawierania i rozwiązywania umów
                                    o świadczenie usług drogą elektroniczną, a także tryb postępowania
                                    reklamacyjnego.<br/>
                                    4. Każdy Usługobiorca z chwilą podjęcia czynności zmierzających do korzystania z
                                    Usług Elektronicznych Strony daps, zobowiązany jest do przestrzegania postanowień
                                    niniejszego Regulaminu.<br/>
                                    5. W sprawach nieuregulowanych w niniejszym Regulaminie mają zastosowanie
                                    przepisy<br/>
                                    <div className="tabulator">1. Ustawy o świadczeniu usług drogą elektroniczną z dnia
                                        18 lipca 2002 r. (Dz. U. Nr 144, poz. 1204 ze zm.),
                                    </div>
                                    <div className="tabulator">2. Ustawy o prawach konsumenta z dnia 30 maja 2014 r.
                                        (Dz. U. 2014 poz. 827),
                                    </div>
                                    <div className="tabulator">3. Ustawy Kodeks cywilny z dnia 23 kwietnia 1964 r. (Dz.
                                        U. nr 16, poz. 93 ze zm.) oraz inne właściwe przepisy prawa polskiego.
                                    </div>
                                </p>
                            </TabPane>
                            <TabPane tabId="vertical2">
                                <h5> DEFINICJE </h5>
                                <p className="text-left text-color-white-pink">
                                    1. REGULAMIN - niniejszy regulamin Strony.<br/>
                                    2. USŁUGODAWCA – <b>Dominik Tworek, Albert Trzciński, Piotr Walczak, Sebastian
                                    Turlej</b> wykonujący/a działalność gospodarczą pod firmą DAPS Company, adres
                                    siedziby: Kielce, adres do doręczeń: Kielce, adres poczty
                                    elektronicznej: przykład@gmail.com, tel. 555-555-555. <br/>
                                    3. USŁUGOBIORCA – osoba fizyczna, osoba prawna albo jednostka organizacyjna
                                    nieposiadająca osobowości prawnej, której ustawa przyznaje zdolność prawną
                                    korzystająca z Usługi Elektronicznej.<br/>
                                    4. USŁUGA ELEKTRONICZNA – usługa świadczona drogą elektroniczną przez Usługodawcę na
                                    rzecz Usługobiorcy za pośrednictwem Strony.<br/>
                                </p>
                            </TabPane>
                            <TabPane tabId="vertical3">
                                <h5> RODZAJE I ZAKRES USŁUG ELEKTRONICZNYCH </h5>
                                <p className="text-left text-color-white-pink">
                                    1. Usługodawca umożliwia za pośrednictwem Strony korzystanie z Usług Elektronicznych
                                    takich jak: <b>konto normal, konto PRO</b><br/>
                                    2. Świadczenie Usług Elektronicznych na rzecz Usługobiorców odbywa się na warunkach
                                    określonych w Regulaminie.<br/>
                                </p>
                            </TabPane>
                            <TabPane tabId="vertical4">
                                <h5> WARUNKI ŚWIADCZENIA I ZAWIERANIA UMÓW O ŚWIADCZENIE USŁUG ELEKTRONICZNYCH </h5>
                                <p className="text-left text-color-white-pink">
                                    1. Świadczenie Usług Elektronicznych określonych w rozdziale III pkt. 1 Regulaminu
                                    przez Usługodawcę jest nieodpłatne.<br/>
                                    2. Okres na jaki umowa zostaje zawarta: <b>1 miesiąc.</b><br/>
                                    3. Wymagania techniczne niezbędne do współpracy z systemem teleinformatycznym,
                                    którym posługuje się Usługodawca:<br/>
                                    <div className="tabulator">1. komputer z dostępem do Internetu,</div>
                                    <div className="tabulator">2. dostęp do poczty elektronicznej,</div>
                                    <div className="tabulator">3. przeglądarka internetowa,</div>
                                    <div className="tabulator">4. włączenie w przeglądarce internetowej Cookies oraz
                                        Javascript.
                                    </div>
                                    4. Usługobiorca zobowiązany jest do korzystania ze Strony w sposób zgodny z prawem i
                                    dobrymi obyczajami mając na uwadze poszanowanie dóbr osobistych i praw własności
                                    intelektualnej osób trzecich.<br/>
                                    5. Usługobiorca zobowiązany jest do wprowadzania danych zgodnych ze stanem
                                    faktycznym.<br/>
                                    6. Usługobiorcę obowiązuje zakaz dostarczania treści o charakterze bezprawnym.<br/>
                                </p>
                            </TabPane>
                            <TabPane tabId="vertical5">
                                <h5> WARUNKI ROZWIĄZYWANIA UMÓW O ŚWIADCZENIE USŁUG ELEKTRONICZNYCH </h5>
                                <p className="text-left text-color-white-pink">
                                    1. Świadczenie Usług Elektronicznych określonych w rozdziale III pkt. 1 Regulaminu
                                    przez Usługodawcę jest automatycznie rozwiązywane:<br/>
                                    <div className="tabulator"> 1. W momencie nie opłacenia abonamentu,</div>
                                    <div className="tabulator"> 2. W momencie nieprzestrzegania regulaminu</div>
                                    2. Usługodawca nie musi sam rozwiązywać rozwiązywać usługi.<br/>
                                    3. Podczas rozwiązania usługi Usługodawca nie ponosi żadnych kosztów.<br/>
                                    4. Administratorzy strony zastrzegają sobie prawo do zablokowania Usługodawcy z
                                    dokładnym podaniem przyczyny.<br/>
                                </p>
                            </TabPane>
                            <TabPane tabId="vertical6">
                                <h5> TRYB POSTĘPOWANIA REKLAMACYJNEGO </h5>
                                <p className="text-left text-color-white-pink">
                                    1. Reklamacje związane ze świadczeniem Usług Elektronicznych przez Usługodawcę:<br/>
                                    <div className="tabulator"> 1. Reklamacje związane ze świadczeniem Usług
                                        Elektronicznych za pośrednictwem Strony Usługobiorca może składać za
                                        pośrednictwem poczty elektronicznej na adres: przykład@gmail.com
                                    </div>
                                    <div className="tabulator"> 2. W powyższej wiadomości e-mail, należy podać jak
                                        najwięcej informacji i okoliczności dotyczących przedmiotu reklamacji, w
                                        szczególności rodzaj i datę wystąpienia nieprawidłowości oraz dane kontaktowe.
                                        Podane informacje znacznie ułatwią i przyspieszą rozpatrzenie reklamacji przez
                                        Usługodawcę.
                                    </div>
                                    <div className="tabulator"> 3. Rozpatrzenie reklamacji przez Usługodawcę następuje
                                        niezwłocznie, nie później niż w terminie 14 dni.
                                    </div>
                                    <div className="tabulator"> 4. Odpowiedź Usługodawcy w sprawie reklamacji jest
                                        wysyłana na adres e-mail Usługobiorcy podany w zgłoszeniu reklamacyjnym lub w
                                        inny podany przez Usługobiorcę sposób.
                                    </div>
                                </p>
                            </TabPane>
                            <TabPane tabId="vertical7">
                                <h5> WŁASNOŚĆ INTELEKTUALNA </h5>
                                <p className="text-left text-color-white-pink">
                                    1. Wszystkie treści zamieszczone na stronie internetowej pod adresem daps korzystają
                                    z ochrony prawno autorskiej i są własnością daps Usługobiorca ponosi pełną
                                    odpowiedzialność za szkodę wyrządzoną Usługodawcy, będącą następstwem użycia
                                    jakiejkolwiek zawartości strony daps, bez zgody Usługodawcy.<br/>
                                    2. Jakiekolwiek wykorzystanie przez kogokolwiek, bez wyraźnej pisemnej zgody
                                    Usługodawcy, któregokolwiek z elementów składających się na treść oraz zawartość
                                    strony daps stanowi naruszenie prawa autorskiego przysługującego Usługodawcy i
                                    skutkuje odpowiedzialnością cywilnoprawną oraz karną.<br/>
                                </p>
                            </TabPane>
                            <TabPane tabId="vertical8">
                                <h5> POSTANOWIENIA KOŃCOWE
                                </h5>
                                <p className="text-left text-color-white-pink">
                                    1. Umowy zawierane za pośrednictwem Strony zawierane są zgodnie z prawem polskim.<br/>
                                    2. W przypadku niezgodności jakiejkolwiek części Regulaminu z obowiązującym prawem, w miejsce zakwestionowanego przepisu Regulaminu zastosowanie mają właściwe przepisy prawa polskiego.<br/>
                                </p>
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
            </>
        )
    }
}

export default Regulamin