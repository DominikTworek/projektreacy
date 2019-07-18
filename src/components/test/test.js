import React, {Component} from 'react';
import {PostData} from "../../services/PostData";
import {
    NavItem,
    NavLink,
    Nav,
    Navbar, Container, Label, Input, Button
} from "reactstrap";

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LoginLogin:'',
            LoginPassword:'',
        };
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    login(){
        PostData('login', this.state).then((result) =>{
            let responseJSON = result;
            console.log(responseJSON);
        });
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }


    render() {
        return (
            <>
                <Navbar className="fixed-top bg-dark">
                    <Container>
                        <div className="test"> DAPS</div>
                        <div className="rightnav">
                            <Nav className="justify-content-right">
                                <NavItem>
                                    <NavLink href="/">Wróć</NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                    </Container>
                </Navbar>
                <blockquote className="blockquote">
                    <p className="mb-0">Regulamin</p>
                </blockquote>

                        <Label for="LoginLogin">Login</Label>
                        <Input
                            type="text"
                            name="LoginLogin"
                            placeholder="Wpisz login"
                            onChange={this.onChange}
                        />


                        <Label for="LoginPassword">Hasło</Label>
                        <Input
                            type="password"
                            name="LoginPassword"
                            placeholder="Wpisz Hasło"
                            autoComplete="off"
                            onChange={this.onChange}
                        />


                    <Button type="submit" value="login" color="primary" onClick={this.login}>
                        Zaloguj
                    </Button>

            </>
        )
    }
}

export default Test