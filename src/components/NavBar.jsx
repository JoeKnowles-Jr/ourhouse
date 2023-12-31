import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const NavBar = () => {
  const { auth, user, signOut } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { error } = await signOut();
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("user", user)

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>OurHouse 1.1</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav></Nav>
          <Nav className="me-auto">
            {!auth && (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
            {!auth && (
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            )}
            {auth && (
              <div className="d-flex align-items-center justify-content-center">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/todos">
                  Todos
                </Nav.Link>
                <Nav.Link as={Link} to="/lists">
                  Lists
                </Nav.Link>
                <Nav.Link as={Link} to="/calendar">
                  Calendar
                </Nav.Link>
              </div>
            )}
          </Nav>
          <Nav>
            {auth && (
              <div className="d-flex align-items-center justify-content-around">
                <Nav.Link as={Link} to="/profile">
                  {user.user_metadata.avatar_url && <img src={user.user_metadata.avatar_url} title="Profile" style={{
                    width: "48px",
                    borderRadius: "50%",
                    marginRight: "2rem"
                  }} />}
                  {!user.user_metadata.avatar_url && <span style={{ backgroundColor: "#777", padding: ".75rem", border: "1px solid white", borderRadius: "1rem" }}>Profile</span>}
                </Nav.Link>
                <Nav.Link as={Button} onClick={handleLogout}>
                  LogOut
                </Nav.Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
