import Head from 'next/head'
import Image from 'next/image'

import { ChangeEvent, MouseEvent, useState } from 'react'
import Header from '../components/header'
import Layout, { siteTitle } from '../components/layout'
import { GetStaticProps, GetServerSideProps } from 'next'

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

    const handleClose = () => setShow(false);
    const handleShow = (e:HandleCardClick) => {
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
      await settask({ ...task, [name] : value });
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
        <div className={styles.grid}>
          {characters.results.map(({ name, status, image, id }) => (
            <Card id={id} className={styles.card} onClick={handleShow}>
              <Card.Img id={id} variant="top" src={image} />
              <Card.Body id={id}>
                <Card.Title id={id} className={styles.card_title}>{name}</Card.Title>
                <Card.Text id={id}>
                  {status}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
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
            <Row>
              <Col xs={12} md={3}>
                Estado:
              </Col>
              <Col xs={12} md={9}>
                {char_name.status}
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={3}>
                Especie:
              </Col>
              <Col xs={12} md={9}>
                {char_name.species}
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={3}>
                Tipo:
              </Col>
              <Col xs={12} md={9}>
                {char_name.type}
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={3}>
                Género:
              </Col>
              <Col xs={12} md={9}>
                {char_name.gender}
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={3}>
                Origen:
              </Col>
              <Col xs={12} md={9}>
                {char_name.origin}
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={3}>
                Ubicación:
              </Col>
              <Col xs={12} md={9}>
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

