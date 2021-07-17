import React from "react";

import AquaHubAPIWorker from "./aqua_hub_api/aquaHubAPI";

import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

import MainPage from "./pages/mainPage";
import UserPage from "./pages/userPage";
import * as cst from "./tools/constants";

class AppContent extends React.Component {
    constructor(props) {
        super(props);
        this.apiWorker = new AquaHubAPIWorker(cst.SERVER_ADDR);
        this.state = {
            currentPage: cst.MAIN_PAGE,
            currentPageData: {},
            currentUser: null
        }
    }

    render() {
        let currentPage;
        switch(this.state.currentPage) {
            case cst.MAIN_PAGE:
                currentPage = <MainPage 
                    apiWorker={this.apiWorker}
                    onNicknameClick={
                        (user) => {
                            this.setState({
                                currentPage: cst.USER_PAGE,
                                currentPageData: {
                                    userId: user.userId
                                }
                            });
                        }
                }/>;
                break;
            case cst.USER_PAGE:
                currentPage = <UserPage 
                    apiWorker={this.apiWorker}
                    userId={this.state.currentPageData.userId}
                    onNicknameClick={
                        (user) => {
                            this.setState({
                                currentPage: cst.USER_PAGE,
                                currentPageData: {
                                    userId: user.userId
                                }
                            });
                        }
                    }/>;
                break;
            default:
                currentPage = (<div>
                    Unknown page: {this.state.currentPage}
                </div>);  // TODO: add error widget
        }
        return (
            <div className="App">
                <header className="App-header">
                    <Navbar 
                      expand="lg"
                      bg="light" 
                      sticky="top">
                        <Container>
                            <Navbar.Brand>AquaHub</Navbar.Brand>
                            <Navbar.Toggle aria-controls="navbar-nav"/>
                            <Navbar.Collapse id="navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Item>
                                        <Button
                                        variant="link"
                                        onClick={
                                            () => {
                                                this.setState({
                                                    currentPage: cst.MAIN_PAGE
                                                });
                                            }
                                        }>
                                            Main page
                                        </Button>
                                    </Nav.Item>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </header>
                {currentPage}
            </div>
        );
    }
}

export default AppContent;
