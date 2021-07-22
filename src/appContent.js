import React from "react";

import AquaHubAPIWorker from "./aqua_hub_api/aquaHubAPI";

import AppHeader from "./widgets/header";
import AppHeaderButton from "./widgets/headerButton";

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
        this.openUserPage("me");
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
                <AppHeader>
                    <AppHeaderButton
                        text="Account"
                        onClick={
                            () => {
                                this.openUserMePage();
                            }
                        }/>
                    <AppHeaderButton
                        text="Main page"   
                        onClick={this.openMainPage}/>
                    <AppHeaderButton
                        text="Login" 
                        onClick={
                            () => {
                                this.openLoginPage(null);
                            }
                        }/>
                </AppHeader>
                {this.state.currentPage}
            </div>
        );
    }
}


export default AppContent;
