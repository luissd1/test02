import Head from 'next/head'

import { ChangeEvent, MouseEvent, useState } from 'react'
import Header from '../components/header'
import Layout, { siteTitle } from '../components/layout'
import { GetStaticProps, GetServerSideProps } from 'next'

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { gql } from "@apollo/client";
import client from "../apollo-client";

import styles from '../styles/header.module.css'
import { useRouter } from 'next/router'

type HandleInputChange = ChangeEvent<HTMLInputElement>
type HandleButtonClick = MouseEvent<HTMLButtonElement,globalThis.MouseEvent>
type HandleSelectEvent = ChangeEvent<HTMLSelectElement>

let listItems = []
const GET_EPISODE = gql`
      query Episodes ($page: Int $name: String) {
        episodes (page: $page, filter: {name: $name}) {
          info {
            count
            pages
          }
          results {
            id
            name
            air_date
            episode
          }
        }
      }
      `
export default function Episodios(
  {
    episodes,
  }: {
    episodes:{ 
      info:{
        count:number
        pages:number
      },
      results:{
        id: number
        name: string
        air_date: string
        episode: string
      }[]
    }  
  }) {
    let names = Array.from(Array(episodes.info.pages).keys())
    listItems = names.map((pages) =>  <option value={pages+1}>{pages+1}</option>);
    const router = useRouter();

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
      await router.push(`chapters/?filter=${task.search}&page=1`);
    }
    const handleSelect = async ({
      target: {
        name,
        value,
      },
    }: HandleSelectEvent) => {
      await settask({ ...task, [name] : value });
      await router.push(`chapters/?filter=${task.search}&page=${value}`);
    }
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Header></Header>
      <Container>
        <InputGroup size="sm" className="my-3">
            <Form.Control className="me-auto" type="text" name="search" placeholder="Ingrese episodio..." onChange={handleinputchange} />
            <Button variant="outline-secondary" onClick={handlebuttonclick}>Search</Button>
        </InputGroup>
      </Container>
      <section>
      Página:  <select name="indice" onChange={handleSelect}>
        {listItems}
      </select>
      </section>
      <section >
        <Container fluid>
            <Row xs={1} sm={2} md={3} lg={4} xl={5}>
                {episodes.results.map(({ id, name, air_date, episode }) => (
                    <Col>
                        <Card bg='light' id={id.toString()} className={styles.card}>
                            <Card.Header as="h5">{episode}</Card.Header>
                            <Card.Body id={id.toString()}>
                                <Card.Title id={id.toString()} className={styles.card_title}>{name}</Card.Title>
                                <Card.Text id={id.toString()}>
                                {air_date}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  if(!query.filter) 
    query.filter = ''
  
  if(!query.page) 
    query.page = '1'
  const { data } = await client.query({
    query: GET_EPISODE,variables:{page:Number(query.page), name:query.filter}
  });

  return {
    props: {
      episodes: data.episodes,
    },
  };
}

