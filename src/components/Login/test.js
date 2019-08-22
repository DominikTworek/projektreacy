import React from "react";
import {
    CardHeader,
    CardBody,
    CardFooter,
    CardImg,
    CardTitle,
    Container,
    Row,
    Col
} from "reactstrap";
import axios from 'axios';


import ExamplesNavbar from "components/Navbars/RegisterNavbar.jsx";

class TestPage extends React.Component {
    state = {
        squares1to6: "",
        squares7and8: "",
        orders: null
    };
    componentDidMount() {
        axios.defaults.baseURL = 'http://localhost:5001/projekt-studia/us-central1/api';
        axios.get('orders')
            .then(res => {
                console.log(res.data);
                this.setState({
                    orders: res.data
                })
            })
            .catch(err => console.log(err));
    }
    render() {
        let recentOrdersMarkup = this.state.orders ? (
            this.state.orders.map(order => <p>{order.body}</p>)
        ) : <p>Ładowanie...</p>
        return (
            <>
                <ExamplesNavbar />
                <div className="page-header">
                    <div className="content">
                        <Container>
                            <Row>
                                <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                                    <div className="card-register cardd ">
                                        <CardHeader>
                                            <CardImg
                                                alt="..."
                                                src={require("assets/img/square-purple-1.png")}
                                            />
                                            <CardTitle tag="h4">Rejestracja</CardTitle>
                                        </CardHeader>
                                        <CardBody>
                                            {recentOrdersMarkup}

                                        </CardBody>
                                        <CardFooter>
                                        </CardFooter>
                                    </div>
                                </Col>
                            </Row>
                            <div className="register-bg" />
                        </Container>
                    </div>
                </div>
            </>
        );
    }
}

export default TestPage;
