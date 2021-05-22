import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withCookies, useCookies } from "react-cookie";
// import components
import "../AudioUpload/AudioUpload";
// import bootstrap components
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import AudioUpload from "../AudioUpload/AudioUpload";

const NavBar = ({ hasCookie, setHasCookie, removeCookie }) => {
  //   const [cookies, removeCookie] = useCookies(["user"]);
  //   const [hasCookie, setHasCookie] = useState(false);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Audio Editor App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {hasCookie ? (
            <>
              <Nav.Link>Home</Nav.Link>
              <Nav.Link>Link</Nav.Link>
              <AudioUpload />
            </>
          ) : (
            <></>
          )}

          {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
        {hasCookie ? (
          <Button className="ml-auto" variant="primary" onClick={removeCookie}>
            logout
          </Button>
        ) : (
          <></>
        )}

        {/* <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form> */}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
