import React from "react";

import Alert from "react-bootstrap/Alert";

class ErrorWidget extends React.Component {
    render() {
        return (
            <Alert variant="danger">
                <Alert.Heading>{this.props.title}</Alert.Heading>
                <p>{this.props.content}</p>
            </Alert>
        );
    }
}

export class ConnectionErrorWidget extends React.Component {
    render() {
        return (
            <ErrorWidget 
                title="Connection failed"
                content="Failed to connect to the server"/>
        );
    }
}

export default ErrorWidget;
