// Navbar

import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function AppNavbar() {
    return (
        <>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                <Navbar.Brand href="#home">Ecamazon </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Payment</Nav.Link>
                </Nav>
                </Container>
        </Navbar>
        </>
      );}

export default AppNavbar;
