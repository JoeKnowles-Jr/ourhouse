import { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import logo from "../../images/g-logo.png"

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, user, loginWithGoogle } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMsg("");
      setLoading(true);
      if (!passwordRef.current?.value || !emailRef.current?.value) {
        setErrorMsg("Please fill in the fields");
        return;
      }
      const {
        data: { user, session },
        error
      } = await login(emailRef.current.value, passwordRef.current.value);
      if (error) setErrorMsg(error.message);
      if (user && session) navigate("/");
    } catch (error) {
      setErrorMsg("Email or Password Incorrect");
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card style={{
        width: "40%",
        marginTop: "5rem",
        borderRadius: "5rem"
      }}>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleSubmit} style={{
            width: "50%",
            margin: "0 auto"
          }}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            {errorMsg && (
              <Alert
                variant="danger"
                onClose={() => setErrorMsg("")}
                dismissible>
                {errorMsg}
              </Alert>
            )}
            <div className="w-100 text-center mt-2">
              Forgot Password? <Link to={"/passwordreset"}>Click Here</Link>
            </div>
            <div className="d-flex flex-column text-center mt-2">
              <Button disabled={loading} type="submit" className="w-75" style={{ margin: "1rem auto" }}>
                Login
              </Button>
              <Button disabled={loading} type="button" onClick={loginWithGoogle} className="w-75 btn-secondary" style={{ margin: "2rem auto" }}>
                <img style={{
                  marginRight: "1rem"
                }} width="32" src={logo} />
                Login with Google
              </Button>
            </div>
          </Form>
        </Card.Body>
        <div className="w-100 text-center mb-5">
          New User? <Link to={"/register"}>Register here</Link>
        </div>

      </Card>
    </div>
  );
};

export default Login;
