import { Navbar, Container, Nav } from 'react-bootstrap'
import { NavLink, useLocation } from 'react-router-dom'
import AppIcon from '../AppIcon'
import './NavigationMenu.css'

const MenuItem = ({ href, title, icon }) => {
  return (
    <NavLink to={href}>
      {icon} {title}
    </NavLink>
  )
}

const NavigationMenu = () => {
  const menuItems = {
    leftSide: [
      {
        href: '/agenda',
        title: 'Agenda',
        icon: <AppIcon iconName='EventNote'/>,
      },
      {
        href: '/ledger',
        title: 'Ledger',
        icon: <AppIcon iconName='AppRegistration'/>,
      },
    ],
    rightSide: [
      {
        href: '/',
        title: 'About',
        icon: <AppIcon iconName='EventNote'/>,
      },
    ],
  }

  const location = useLocation();
  const getUserLocation = () => {
    const leftMenuItem = menuItems.leftSide.find((item) => item.href === location.pathname);
    const rightMenuItem = menuItems.rightSide.find((item) => item.href === location.pathname);
  
    return leftMenuItem || rightMenuItem || menuItems.rightSide[0]; // Usar el primer elemento de leftSide como predeterminado si no se encuentra en ninguno de los dos lados
  };

  const { title, icon, href } = getUserLocation();
  return (
    <Navbar expand='lg'>
      <Container>
        <Navbar.Brand href={href}>
          {icon} {title}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='menu-collapse' />
        <Navbar.Collapse id='menu-collapse'>
          <Nav>
            {menuItems.leftSide.map((menuItem, index) => (
              <MenuItem
                key={index}
                href={menuItem.href}
                title={menuItem.title}
                icon={menuItem.icon}
              />
            ))}
          </Nav>
          <Nav>
            <Navbar.Brand>IAM-DEV88</Navbar.Brand>
            {menuItems.rightSide.map((menuItem, index) => (
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
  )
}

export default NavigationMenu