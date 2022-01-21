import {Navbar, Nav, NavDropdown, Container, Button} from "react-bootstrap";
import {useState} from "react";
import { useNavigate, Link } from "react-router-dom";

function Navigation() {
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("role") != null)
    let navigate = useNavigate();

    window.addEventListener('storage', () => {
         setLoggedIn(localStorage.getItem("role") != null)   
      });

    return (
        <>
            <Navbar bg="primary" expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand onClick={() => navigate("/proiecte")}>Acordare note</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* daca am rolul de project manager, voi putea vedea formularele pentru creat proiecte si livrabile */}
                        {localStorage.getItem("role") == "PM" && <Link className="text-light mx-3" to="/createproject">Create project</Link>}
                        {localStorage.getItem("role") == "PM" && <Link className="text-light mx-3" to="/createlivrabil">Create Livrabil</Link>}
                        </Nav>
                        <Nav >
                    {/* daca sunt logat */}
                    {loggedIn ? <Button variant="light" onClick={() => {
                        // delogare, sterg rol mail parola din localstorage, si redirectionez userul la prima pagina
                        localStorage.clear()
                        setLoggedIn(false);
                        navigate("/login")
                    }}>Log out</Button> : <Button variant="light" onClick={() => {
                        // nu sunt logat
                        navigate("/login")
                        }}>Log in</Button>}
                    </Nav>
                    </Navbar.Collapse>
                    
                </Container>
            </Navbar>
        </>
    );
}

export default Navigation;