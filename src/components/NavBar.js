import React from 'react';
import {
    Nav,
    Navbar,
    // NavDropdown,
    // Form,
    // FormControl,
    // Button
} from 'react-bootstrap';


function NavBar() {
    return (
        <div>
            <Navbar variant="dark" expand="lg" style={{
                backgroundColor: '#22543D'
            }}>
                <Navbar.Brand href="#">LinkTrackr</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                    <Nav.Link href="#links">Links</Nav.Link>
                    <Nav.Link href="#tags">Tags</Nav.Link>
                    </Nav>
                    {/* <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                    </Form> */}
                </Navbar.Collapse>
                </Navbar>
        </div>
    )
};

export default NavBar;
