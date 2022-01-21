import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";

import useSWR from "swr";

import { Container, Row, Col, FormGroup, Form, Button, Card } from "react-bootstrap";

import "./style.css";

import Tabel from "../components/Tabel";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Project = () => {

    // se iau datele din backend si id-ul din url
    const {id} = useParams()
    const { data, error } = useSWR("http://localhost:5500/project/" + id , fetcher);

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    return (
        <>
        <Container>
                <Card className="my-5">
                <Card.Header>
            <Row className="">
                <Col md={6} className=" d-flex justify-content-center mt-2" >
                    {/* numele proiectului */}
                    <h4>{data.name}</h4>
                </Col>
            </Row>
            </Card.Header>
            <Card.Body>
            <Row>
            <Col >
            {/* tabel livrabile */}
                    <Tabel coloane={["id", "name", "completed"]} primaColoanaLink urlBaza={"/livrabil/" + id} url={"http://localhost:5500/project/livrabile/" + id}/>
                </Col>
                </Row>
        </Card.Body>
    </Card>
    </Container>
    </>
    );
};

export default Project;
