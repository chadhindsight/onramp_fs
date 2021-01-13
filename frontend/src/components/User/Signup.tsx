import React from 'react';
import { Form, Button } from 'react-bootstrap';

const Signup = () => {
    return (
        <Form className="input-sm tifa">
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Name</Form.Label>
                <Form.Control type="password" placeholder="What is your name?" />
            </Form.Group>

            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
                We will never share your email with other companies.
            </Form.Text>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default Signup;