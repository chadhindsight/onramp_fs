import React from 'react';
import { Button, Card } from 'react-bootstrap';

const Post = (props) => {
    console.log(props)
    return (
        <>
            <Card style={{ width: '18rem', marginBottom: '2rem', }}>
                <Card.Title>{props.info.title}</Card.Title>
                <Card.Text>{props.info.content}</Card.Text>
                <Button variant="danger">Delete</Button>
            </Card>
        </>
    );
};

export default Post;