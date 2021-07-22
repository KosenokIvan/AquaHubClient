import React from "react";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";


class AppHeader extends React.Component {
    render() {
        return (
            <header className="App-header">
                <Navbar
                expand="lg"
                bg="light"
                sticky="top">
                    <Container fluid>
                        <Navbar.Brand>AquaHub</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbar-nav"/>
                        <Navbar.Collapse id="navbar-nav">
                            <Nav className="me-auto">
                                {this.props.children}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}

export default AppHeader;
