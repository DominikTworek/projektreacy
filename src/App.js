import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Nav, NavItem, NavLink } from 'reactstrap';
import "components/Navbars/IndexNavbar.jsx";


function App() {
  return (
    <div className="App">
      <Nav className="justify-content-right">
        <NavItem>
          <NavLink href="#">Link</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Link</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Another Link</NavLink>
        </NavItem>
        <NavItem>
          <NavLink disabled href="#">Disabled Link</NavLink>
        </NavItem>
      </Nav>
    </div>
  );
}

export default App;
