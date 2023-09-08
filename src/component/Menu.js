import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import EventNoteIcon from '@mui/icons-material/EventNote';

const Menu = () => {
  const location = useLocation();

  // Función para obtener el href según la ruta actual
  const getBrandHref = () => {
    switch (location.pathname) {
      case "/":
        return "/";
      default:
        return "/archivo";
    }
  };

  // Función para obtener el título según la ruta actual
  const getTitle = () => {
    switch (location.pathname) {
      case "/archivo":
        return (
          <>
            <AppRegistrationIcon /> Archivo
          </>
        );
      default:
        return (
          <>
            <EventNoteIcon /> Agenda
          </>
        );
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href={getBrandHref()}>{getTitle()}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href={`/`}>Agenda</Nav.Link>
            <Nav.Link href={`/archivo`}>Archivo</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
