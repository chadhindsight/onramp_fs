import React, { Component } from 'react';
// import { Navbar, Nav } from 'react-bootstrap';
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div>
                <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                    <Container>
                        <Link to='/'>
                            <Navbar.Brand>Ublog</Navbar.Brand>
                        </Link>
                        <Navbar.Toggle aria-controls='basic-navbar-nav' />
                        <Navbar.Collapse id='basic-navbar-nav'>
                            <Link />
                            <Nav className='ml-auto'>
                                <Link to='/cart'>
                                    <Nav.Link>
                                        <i className='fas fa-shopping-cart'></i> Profile
                            </Nav.Link>
                                </Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default Header;
