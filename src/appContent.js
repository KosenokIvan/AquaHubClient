import React from "react";

import AquaHubAPIWorker from "./aqua_hub_api/aquaHubAPI";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

import MainPage from "./pages/mainPage";
import UserPage from "./pages/userPage";
import LoginPage from "./pages/loginPage";
import * as cst from "./tools/constants";

class AppContent extends React.Component {
    constructor(props) {
        super(props);
        this.apiWorker = new AquaHubAPIWorker(cst.SERVER_ADDR);

        this.getMainPage = this.getMainPage.bind(this);
        this.openMainPage = this.openMainPage.bind(this);
        this.openUserPage = this.openUserPage.bind(this);
        this.openUserMePage = this.openUserMePage.bind(this);
        this.openLoginPage = this.openLoginPage.bind(this);

        this.state = {
            currentPage: this.getMainPage(),
            currentUser: null
        };
    }

    getMainPage() {
        return (
            <MainPage
            apiWorker={this.apiWorker}
            onNicknameClick={
                (user) => {
                    this.openUserPage(user.userId);
                }
            }/>
        );
    }

    openMainPage() {
        this.setState({
            currentPage: this.getMainPage()
        });
    }

    openUserPage(user_id) {
        this.setState({
            currentPage: (
                <UserPage
                apiWorker={this.apiWorker}
                userId={user_id}
                onNicknameClick={
                    (user) => {
                        this.openUserPage(user.userId);
                    }
                }/>
            )
        });
    }

    openUserMePage() {
        this.setState({
            currentPage: (
                <UserPage
                apiWorker={this.apiWorker}
                userId="me"
                onNicknameClick={
                    (user) => {
                        this.openUserPage(user.userId);
                    }
                }/>
            )
        });
    }

    openLoginPage(errorMessage=null) {
        this.setState({
            currentPage: (
                <LoginPage
                errorMessage={errorMessage}
                onLogin={
                    (nickname, password) => {
                        this.apiWorker.login(nickname, password).then(
                            () => {
                                this.openUserMePage();
                            },
                            (err) => {
                                this.openLoginPage(err.message);
                            }
                        );
                    } 
                }/>
            )
        });
    }

    render() {
        return (
            <div className="App">
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
                                    <Nav.Item>
                                        <Nav.Link onClick={this.openMainPage}>
                                            Main page
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link variant="link" onClick={
                                            () => {
                                                this.openLoginPage(null);
                                            }
                                        }>
                                            Login
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </header>
                {this.state.currentPage}
            </div>
        );
    }
}

export default AppContent;
