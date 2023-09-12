import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import EventNoteIcon from "@mui/icons-material/EventNote";

// Componente para un elemento de menú individual
const MenuItem = ({ href, title, icon }) => {
  return (
    <Nav.Link href={href}>
      {icon} {title}
    </Nav.Link>
  );
};

// Componente compuesto para el menú completo
const Menu = () => {
  const location = useLocation();

  const menuItems = [
    {
      href: "/",
      title: "Agenda",
      icon: <EventNoteIcon />,
    },
    {
      href: "/archivo",
      title: "Archivo",
      icon: <AppRegistrationIcon />,
    },
  ];

  // Función para obtener el título y el ícono según la ruta actual
  const getTitleAndIcon = () => {
    const menuItem = menuItems.find((item) => item.href === location.pathname);
    return menuItem || menuItems[0]; // Usar el primer elemento como predeterminado
  };

  const { title, icon } = getTitleAndIcon();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href={title.href}>
          {icon} {title}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {menuItems.map((menuItem, index) => (
              <MenuItem
                key={index}
                href={menuItem.href}
                title={menuItem.title}
                icon={menuItem.icon}
              />
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
