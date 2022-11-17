import Head from 'next/head'

import { ChangeEvent, MouseEvent, useState } from 'react'
import Header from '../components/header'
import Layout, { siteTitle } from '../components/layout'
import { GetStaticProps, GetServerSideProps } from 'next'
import { Star } from "../public/images/star.jsx";

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { gql } from "@apollo/client";
import client from "../apollo-client";

import utilStyles from '../styles/utils.module.css'
import styles from '../styles/header.module.css'

import { useRouter } from 'next/router'

type HandleInputChange = ChangeEvent<HTMLInputElement>
type HandleButtonClick = MouseEvent<HTMLButtonElement,globalThis.MouseEvent>
type HandleSelectEvent = ChangeEvent<HTMLSelectElement>
type HandleCardClick = MouseEvent<HTMLElement>
type HandleStarclick = MouseEvent<SVGSVGElement>

let char_name = {image:'',name:'',status:'',type:'',species:'',gender:'',origin:'',location:''}
let listItems = []
const GET_CHARACTER = gql`
      query Characters ($page: Int $name: String) {
        characters (page: $page, filter: {name: $name}) {
          info {
            count
            pages
          }
          results {
            name
            status
            image
            id
            species
            type
            gender
            origin {
              name
              }
            location {
              name
              }
          }
        }
      }
      `
var Character_filter = ''
export default function Home(
  {
    characters,
  }: {
    characters:{ 
      info:{
        count:number
        pages:number
      },
      results:{
        name: string
        status: string
        image: string
        id: string
        species: string
        type: string
        gender: string
        origin: {
          name: string
        }
        location:{
          name: string
        }
      }[]
    }  
  }) {
    let names = Array.from(Array(characters.info.pages).keys())
    listItems = names.map((pages) =>  <option value={pages+1}>{pages+1}</option>);
    const router = useRouter();

    const [show, setShow] = useState(false);
    const [fav, setfav] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (e: { currentTarget: { id:string } }) => {
      setShow(true);
      characters.results.forEach(function (value) {
        if (value.id == e.currentTarget.id) {
          char_name = {
            image:value.image,
            name: value.name,
            status: value.status,
            species: value.species,
            type: value.type,
            gender: value.gender,
            origin: value.origin.name,
            location: value.location.name
          }
        }
      }); 
    };
    const handleStarclick = (e: { currentTarget: { tagName: string } }) => {
      setfav(!fav)
      console.log(fav)
      if (fav == true) {
        console.log('amarillo')
      } else {
        console.log('gris')
      }
    }
    const [task, settask] = useState({
      search: '',
      indice: ''
    })

    const handleinputchange = ({
      target: {
        name,
        value,
      },
    }: HandleInputChange) => {
      settask({ ...task, [name]: value });
    }
    const handlebuttonclick = async ({
    }: HandleButtonClick) => {
      await router.push(`/?filter=${task.search}&page=1`);
    }
    const handleSelect = async ({
      target: {
        name,
        value,
      },
    }: HandleSelectEvent) => {
      settask({ ...task, [name] : value });
      await router.push(`/?filter=${task.search}&page=${value}`);
    }
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Header></Header>
      <Container>
        <InputGroup size="sm" className="my-3">
            <Form.Control className="me-auto" type="text" name="search" placeholder="Ingrese personaje..." onChange={handleinputchange} />
            <Button variant="outline-secondary" onClick={handlebuttonclick}>Search</Button>
        </InputGroup>
      </Container>
      <section>
      Página:  <select name="indice" onChange={handleSelect}>
        {listItems}
      </select>
      </section>
      <section >
        <Container>
          <Row xs={1} sm={2} md={3} lg={4} xl={5}>
            {characters.results.map(({ name, status, image, id }) => (
              <Col>
                <Card id={id} className={styles.card}>
                  <Card.Img id={id} variant="top" src={image} onClick={handleShow}/>
                  <a className="position-absolute bottom-0 start-0" href="#" onClick={handleStarclick}>
                    <Star />
                  </a>
                  <Card.Body id={id} onClick={handleShow}>
                    <Card.Title id={id} className={styles.card_title}>{name}</Card.Title>
                    <Card.Text id={id}>
                      {status}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Row className="align-items-md-center">
                <Col className="pe-0 justify-content-md-center" xs={12} md={3}>
                  <img
                    src={char_name.image}
                    className={utilStyles.borderCircle}
                    height={50}
                    width={50}
                    alt={char_name.name}
                  />
                </Col>
                <Col xs={12} md={9}>
                  {char_name.name}
                </Col>
              </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row xs={2} sm={2} md={2} lg={2} xl={2}>
              <Col>
                Estado:
              </Col>
              <Col>
                {char_name.status}
              </Col>
              <Col>
                Especie:
              </Col>
              <Col>
                {char_name.species}
              </Col>
              <Col>
                Tipo:
              </Col>
              <Col>
                {char_name.type}
              </Col>
              <Col>
                Género:
              </Col>
              <Col>
                {char_name.gender}
              </Col>
              <Col>
                Origen:
              </Col>
              <Col>
                {char_name.origin}
              </Col>
              <Col>
                Ubicación:
              </Col>
              <Col>
                {char_name.location}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
      
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  if(!query.filter) 
    query.filter = ''
  
  if(!query.page) 
    query.page = '1'
  const { data } = await client.query({
    query: GET_CHARACTER,variables:{page:Number(query.page), name:query.filter}
  });

  return {
    props: {
      characters: data.characters,
    },
  };
}

