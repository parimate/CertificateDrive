import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Container, Row, Col } from 'react-bootstrap';

function Home() {
  return (
    <>
      <div className="App">
        <img src="https://www.fis.psu.ac.th/en/wp-content/uploads/2022/09/PSU-Logo-01.png" className="logo" alt="PSU logo" width="150" height="100" />
        <img src="https://scontent.fbkk5-3.fna.fbcdn.net/v/t39.30808-6/305618331_513148457478709_2689011196404496399_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=H3XFhNotkzAAX_ZvBZk&_nc_ht=scontent.fbkk5-3.fna&oh=00_AfBh_pbFcM5Nv17Xdjkg27IzYS7qD3nP7Pvi39UjWNfWKw&oe=658FC9D1"
          className="logo" alt="CoE logo" width="100" height="100" />
    
        <h1 style={{ color: "black" }}>DApp Certificate Store</h1>
     
        <Container style={{ padding: 20, marginTop: 20 }}>
          <Row>
            <Col md={4}>
              <Card style={{ padding: 20, width: '20rem' }}>
                <br />
                <Card.Img variant="top" src="https://plus.unsplash.com/premium_photo-1661281234131-5a81d87a4d2a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                <Card.Body>
                  <Card.Title>Admin</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary" href="/Home">Login</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card style={{ padding: 20, width: '20rem' }}>
                <br />
                <Card.Img variant="top" src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                <Card.Body>
                  <Card.Title>Student</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary" href="/Home">Login</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card style={{ padding: 20, width: '20rem' }}>
                <br />
                <Card.Img variant="top" src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                <Card.Body>
                  <Card.Title>Viewer</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary" href="/Home">Login</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="App">
        <p>This is The Home Page</p>
        <Link to="/">Back to Home Page</Link>
      </div>
    </>
  )
}

export default Home