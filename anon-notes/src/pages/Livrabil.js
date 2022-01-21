import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

import axios from "axios";

import {fetcher} from "../util";
import useSWR from 'swr'

import { Container, Row, Col, FormGroup, Form, Button, Card } from "react-bootstrap";

import "./style.css";


const forMarking = true

const Livrabil = () => {
    // iei parametrii din url
    const {id, projectId} = useParams()
    let navigate = useNavigate();
    // iei datele din backend
    const { data, error } = useSWR("http://localhost:5500/livrabil/" + projectId + '/' + id , fetcher);

    const [canEval, setCanEval] = React.useState(false);
    const [nota, setNota] = React.useState(0);

    // acest efect ia nota din backend si o updateaza
    useEffect(async () => {
        // imi iau nota
        const notesR = await axios.get(`http://localhost:5500/project/${projectId}`);
        // iau toate notele din proiect
        const notes = notesR.data.notes;

        // imi caut nota
        const myNote = notes.filter(x => x.user == localStorage.getItem("email"));

        console.log(myNote);

        if (myNote.length == 0) {
            alert("You cannot vote on this project!")
            navigate("/proiecte");
        }

        setNota(myNote[0].note);
    }, [data]);

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>


    
    

    return (
        <>
        <Container>
                <Card className="my-5">
                <Card.Header>
            <Row className="">
                <Col md={6} className=" d-flex justify-content-center mt-2" >
                    {/* nume livrabil */}
                    <h4>{data.name}</h4>
                </Col>
                <Col md={6} className=" d-flex justify-content-end my-1" >
                <Button variant="primary" size="lg" hidden = {canEval || !forMarking} onClick = {() => {setCanEval(!canEval)}} className = "mx-1" >
                    Nota: {nota}
                </Button>
                <input id="number" min="0" max="10" value = {nota} type="number" hidden = {!canEval} onChange = {(e) => { setNota(e.target.value)}} />
                
                <Button variant="primary" size="sm" hidden = {!canEval || !forMarking} onClick = {() => {
                    setCanEval(!canEval);
                    axios.post(`http://localhost:5500/note/${projectId}`, {
                        note: nota
                    }, {
                        headers: {
                            'X-Email': localStorage.getItem("email")
                        }
                    })
                    }} className = "mx-1" >
                    Save
                </Button>

                </Col>
            </Row>
            </Card.Header>
            <Card.Body>
            <Row>
                <Col md={6} >
                <p className = "px-2 py-2"> {data.description}
                </p>
                </Col>
                <Col  md = {1} />
                <Col md={5} >
                    <iframe width="500" height="250" src={data.video}> </iframe>
                    </Col>
                </Row>
        </Card.Body>
    </Card>
    </Container>
    </>
    );
};

export default Livrabil;