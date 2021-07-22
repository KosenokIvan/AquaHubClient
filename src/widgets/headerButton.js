import React from "react";

import Nav from "react-bootstrap/Nav";


class AppHeaderButton extends React.Component {
    render() {
        return (
            <Nav.Item>
                <Nav.Link onClick={this.props.onClick}>
                    {this.props.text}
                </Nav.Link>
            </Nav.Item>
        );
    }
}


export default AppHeaderButton;
