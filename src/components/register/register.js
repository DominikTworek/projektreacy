import {CardBody, Container, FormGroup, Input, Label, Nav, Navbar, NavItem, NavLink} from "reactstrap";
import React, {useState} from "react";
import '../../App.css';

function register() {


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
                <p className="mb-0">Rejestracja</p>
            </blockquote>
            <div className="register-body">

            </div>
        </>
    )
}


export default register;