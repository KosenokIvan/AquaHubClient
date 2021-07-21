import React from "react";

import Alert from "react-bootstrap/Alert";

import LoginForm from "../widgets/loginForm";

class LoginPage extends React.Component {
    render() {
        return (
            <>
                <LoginForm onSubmit={this.props.onLogin}/>
                {
                    this.props.errorMessage !== null &&
                    <Alert variant="danger">
                        {this.props.errorMessage}
                    </Alert>
                }
            </>
        );
    }
}

export default LoginPage;
