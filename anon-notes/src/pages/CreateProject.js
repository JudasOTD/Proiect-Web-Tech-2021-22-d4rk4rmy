import { useState } from "react";
import { Container, Row, Col, FormGroup, Form, Button } from "react-bootstrap";
import axios from "axios";

import {useNavigate} from "react-router-dom";

function CreateProject() {
    const [name, setname] = useState("");
    const [description, setdescription] = useState("");
    const [file, setFile] = useState(null);

    let navigate = useNavigate();

    const newSubmit = async (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:5500/project", {
                name
            })
            .then((r) => {
                navigate("/proiecte");
            })
            .catch((e) => {
                console.log(e)
                alert("Invalid input!");
            });
    };

    return (
        <Container className="my-5">
            <Row className="row d-flex justify-content-center">
                <Col md={4}>
                    <h3>New project</h3>
                </Col>
            </Row>
            <Row className="row d-flex justify-content-center">
                <Col md={4}>
                    <Form onSubmit={newSubmit}>
                        <FormGroup className="form-group my-3">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                            />
                        </FormGroup>
                        <Button type="submit" className="btn btn-primary">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}


export default CreateProject;
