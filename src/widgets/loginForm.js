import React from "react";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: "",
            password: ""
        };
        this.nicknameChange = this.nicknameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
    }

    nicknameChange(e) {
        this.setState({
            nickname: e.target.value
        });
    }

    passwordChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    render() {
        return (
            <Form
            onSubmit={
                (e) => {
                    this.props.onSubmit(
                        this.state.nickname,
                        this.state.password
                    );
                    e.preventDefault();
                }
            }>
                <Form.Group className="mb-3">
                    <Form.Label>Nickname</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>@</InputGroup.Text>
                        <Form.Control 
                        placeholder="name@example.com"
                        value={this.state.nickname}
                        onChange={this.nicknameChange}
                        required/>
                    </InputGroup>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.passwordChange}
                    required/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}

export default LoginForm;
