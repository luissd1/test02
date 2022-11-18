import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


import utilStyles from '../styles/utils.module.css'
import styles from '../styles/header.module.css'

const name = 'Rick & Morty'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.banner}>
        <img
          src="/images/banner_pic.jpg"
          className={utilStyles.borderCircle}
          height={40}
          width={40}
          alt={name}
        />
        <h1 className={utilStyles.headingLg}>{name}</h1>
      </div>
      <Navbar style={{width:'100%'}} bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">Personajes</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link href="chapters">Capítulos</Nav.Link>
            {/* <Nav.Link href="favorites">Favoritos</Nav.Link> */}
              {/* <Nav.Link href="/post/capitulos">Capítulos</Nav.Link>
              <Nav.Link href="/post/favoritos">Favoritos</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
