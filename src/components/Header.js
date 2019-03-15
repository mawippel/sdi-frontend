import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom';

const Header = () => {

  const links = [
    { id: '/configuracao', text: 'Configuração' },
    { id: '/monitoramento', text: 'Monitoramento' }
  ]

  const linksMap = links.map(l =>
    <NavLink key={l.id}
      className='nav-link'
      to={{ pathname: l.id }}>
      {l.text}
    </NavLink>
  )

  console.log('[Header]')

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>SDI Dashboard</Navbar.Brand>
      <Nav className="mr-auto">
        {linksMap}
      </Nav>
    </Navbar>
  );
}

export default React.memo(Header);