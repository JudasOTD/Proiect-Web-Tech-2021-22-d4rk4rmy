import Tabel from "../components/Tabel";
import { Container, Row, Col, FormGroup, Form, Button, Card } from "react-bootstrap";

function Proiecte() {
    return (
        <Container className="my-5">
            <Row className="row d-flex justify-content-center">
                <Col md={8}>
                <h3>Proiecte</h3>
                </Col>
            </Row>
            <Row className="row d-flex justify-content-center my-3">
                <Col md={8}>
                    <Tabel coloane={["id", "name"]} primaColoanaLink calculeazaNota urlBaza="/project" url="http://localhost:5500/projects/"/>
                </Col>
            </Row>
        </Container>
    );
}

export default Proiecte;