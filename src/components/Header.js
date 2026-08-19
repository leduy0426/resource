import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm mb-0">
      <Container>
        <Navbar.Brand
          href="#home"
          className="d-flex align-items-center fw-bold fs-4"
        ></Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ms-3">
            <Nav.Link href="#home" className="active fw-semibold">
              Courses
            </Nav.Link>
            <Nav.Link href="#products" className="fw-semibold">
              Projects
            </Nav.Link>
            <Nav.Link href="#men" className="fw-semibold">
              Review
            </Nav.Link>
            <Nav.Link href="#women" className="fw-semibold">
              Title Confirmation
            </Nav.Link>
            <Nav.Link href="#contact" className="fw-semibold">
              Reference
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
