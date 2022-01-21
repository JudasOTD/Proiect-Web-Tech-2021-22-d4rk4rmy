import { useState } from "react";
import { Container, Row, Col, FormGroup, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateLivrabil() {
    const [name, setname] = useState("");
    const [projectId, setprojectId] = useState("");
    const [description, setdescription] = useState("");
    const [video, setvideo] = useState("");
    const [file, setFile] = useState(null);

    let navigate = useNavigate();


    const newSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        axios
            .post(`http://localhost:5500/livrabil/${projectId}`, {
                name,
                description,
                video
            })
            .then((r) => {
                navigate("/proiecte");
            })
            .catch((e) => {
                console.log(e)
                alert("Invalid input!");
            });
    };

    return(
    <>
    <Row className="row d-flex justify-content-center my-5">
        <Col md={4}>
            <h3>New Livrabil</h3>
        </Col>
    </Row>
    <Row className="row d-flex justify-content-center">
        <Col md={4}>
            <Form onSubmit={newSubmit}>
            <FormGroup className="form-group my-3">
                    <label>project id</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter project id"
                        value={projectId}
                        onChange={(e) => setprojectId(e.target.value)}
                    />
                </FormGroup>
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
                <FormGroup className="form-group my-3">
                    <label>Description</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setdescription(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className="form-group my-3">
                    <label>Video</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter video"
                        value={video}
                        onChange={(e) => setvideo(e.target.value)}
                    />
                </FormGroup>
                <Button type="submit" className="btn btn-primary">
                    Submit
                </Button>
            </Form>
        </Col>
    </Row>
</>
    )}


export default CreateLivrabil;