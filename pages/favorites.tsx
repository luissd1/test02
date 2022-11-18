import Head from 'next/head'
// import Header from '../components/header'
// import Layout, { siteTitle } from '../components/layout'
// import { useState, useEffect } from 'react'
// import Container from 'react-bootstrap/Container';
// import Card from 'react-bootstrap/Card';
// import Modal from 'react-bootstrap/Modal';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';

// import utilStyles from '../styles/utils.module.css'
// import styles from '../styles/header.module.css'


// let char_name = {image:'',name:'',status:'',type:'',species:'',gender:'',origin:'',location:''}
// export default function Favorites(
//   {
//     newCharacters,
//   }: {
//     newCharacters:{ 
//         favorite: boolean
//         name: string
//         status: string
//         image: string
//         id: string
//         species: string
//         type: string
//         gender: string
//         origin: {
//           name: string
//         }
//         location:{
//           name: string
//         }
//       }[]
//   }) {
//     const [show, setShow] = useState(false);
//     const [fav, setfav] = useState({newCharacters});
//     console.log(fav)
//     useEffect(() => {
//       const data = window.localStorage.getItem('MY_APP_STATE');
//       if ( data !== null ) setfav(JSON.parse(data));
//     }, []);
//     const handleClose = () => setShow(false);
//     const handleShow = (e: { currentTarget: { id:string } }) => {
//       setShow(true);
//       fav.newCharacters.forEach(function (value) {
//         if (value.id == e.currentTarget.id) {
//           char_name = {
//             image:value.image,
//             name: value.name,
//             status: value.status,
//             species: value.species,
//             type: value.type,
//             gender: value.gender,
//             origin: value.origin.name,
//             location: value.location.name
//           }
//         }
//       }); 
//     };
    
//     const [task, settask] = useState({
//       search: '',
//       indice: ''
//     })

//   return (
//     <Layout home>
//       <Head>
//         <title>{siteTitle}</title>
//       </Head>
//       <Header></Header>
//       <section >
//         <Container>
//           <Row xs={1} sm={2} md={3} lg={4} xl={5}>
//             {fav.newCharacters.map(({ name, status, image, id }) => (
//               <Col>
//                 <Card id={id} className={styles.card}>
//                   <Card.Img id={id} variant="top" src={image} onClick={handleShow}/>
//                   <a id={id} className="position-absolute bottom-0 start-0" href="#">
//                   </a>
//                   <Card.Body id={id} onClick={handleShow}>
//                     <Card.Title id={id} className={styles.card_title}>{name}</Card.Title>
//                     <Card.Text id={id}>
//                       {status}
//                     </Card.Text>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </Container>
//       </section>
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             <Row className="align-items-md-center">
//                 <Col className="pe-0 justify-content-md-center" xs={12} md={3}>
//                   <img
//                     src={char_name.image}
//                     className={utilStyles.borderCircle}
//                     height={50}
//                     width={50}
//                     alt={char_name.name}
//                   />
//                 </Col>
//                 <Col xs={12} md={9}>
//                   {char_name.name}
//                 </Col>
//               </Row>
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Container>
//             <Row xs={2} sm={2} md={2} lg={2} xl={2}>
//               <Col>
//                 Estado:
//               </Col>
//               <Col>
//                 {char_name.status}
//               </Col>
//               <Col>
//                 Especie:
//               </Col>
//               <Col>
//                 {char_name.species}
//               </Col>
//               <Col>
//                 Tipo:
//               </Col>
//               <Col>
//                 {char_name.type}
//               </Col>
//               <Col>
//                 Género:
//               </Col>
//               <Col>
//                 {char_name.gender}
//               </Col>
//               <Col>
//                 Origen:
//               </Col>
//               <Col>
//                 {char_name.origin}
//               </Col>
//               <Col>
//                 Ubicación:
//               </Col>
//               <Col>
//                 {char_name.location}
//               </Col>
//             </Row>
//           </Container>
//         </Modal.Body>
//       </Modal>
      
//     </Layout>
//   )
// }


