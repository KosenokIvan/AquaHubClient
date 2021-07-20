import React from "react";

import LoginForm from "../widgets/loginForm";

class LoginPage extends React.Component {
    render() {
        return (
            <LoginForm onSubmit={this.props.onLogin}/>
        );
    }
}

export default LoginPage;
