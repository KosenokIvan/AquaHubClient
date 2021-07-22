import React from "react";

import Alert from "react-bootstrap/Alert";

class ErrorWidget extends React.Component {
    render() {
        return (
            <Alert variant="danger">
                <Alert.Heading>{this.props.title}</Alert.Heading>
                {this.props.children}
            </Alert>
        );
    }
}

export class ErrorLink extends React.Component {
    render() {
        return (
            <Alert.Link>{this.props.children}</Alert.Link>
        );
    }
}

export class ConnectionErrorWidget extends React.Component {
    render() {
        return (
            <ErrorWidget title="Connection failed">
                Failed to connect to the server
            </ErrorWidget>
        );
    }
}

export default ErrorWidget;
