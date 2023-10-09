import { useRef, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const PasswordReset = () => {
  const { passwordReset } = useAuth();
  const emailRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await passwordReset(emailRef.current.value);
      if (!error) {
        setMsg("Password reset has been sent to your email");
      }
c    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }}>
      <Card style={{
        width: "40%",
        margin: "5rem auto",
        borderRadius: "5rem"
      }}>
        <Card.Body>
          <h2 className="text-center mb-4">Reset Password</h2>
          <Form onSubmit={handleSubmit} style={{
            width: "50%",
            margin: "0 auto"
          }}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            {msg && (
              <Alert variant="success" onClose={() => setMsg("")} dismissible>
                {msg}
              </Alert>
            )}
            <div className="text-center mt-2">
              <Button disabled={loading} type="submit" className="w-100 mt-4">
                Send Reset Link
              </Button>
            </div>
          </Form>
        </Card.Body>
        <div className="w-100 text-center mt-2">
          Return to login <Link to={"/login"}>here</Link>
        </div>
      </Card>
    </div>
  );
};

export default PasswordReset;
