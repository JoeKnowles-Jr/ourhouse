import { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase/client";

const Register = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");
  const [pwStyle, setPwStyle] = useState({});
  const [pwConfirmStyle, setPwConfirmStyle] = useState({});
  const [loading, setLoading] = useState(false);

  const register = (email, password) =>
    supabase.auth.signUp({ email, password });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !passwordRef.current?.value ||
      !emailRef.current?.value ||
      !confirmPasswordRef.current?.value
    ) {
      setErrorMsg("Please fill all the fields");
      return;
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setErrorMsg("Passwords doesn't match");
      return;
    }
    try {
      setErrorMsg("");
      setLoading(true);
      const { data, error } = await register(
        emailRef.current.value,
        passwordRef.current.value
      );
      console.log(data);
      console.log(error);
      if (!error && data) {
        setMsg(
          "Registration Successful. Check your email to confirm your account"
        );
      }
    } catch (error) {
      setErrorMsg("Error in Creating Account");
    }
    setLoading(false);
  };

  function validatePassword(password) {
    var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\\w\\s]).{8, 20}$/;
    var regex2 = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/;
    const isGood = !regex2.test(password)
    console.log(isGood)
    return isGood;
}

  const handlePwChange = (e) => {
    const pw = e.target.value
    const pwGood = validatePassword(pw)
    const brdr = pwGood ? "1px solid green" : "1px solid red"
    setPwStyle({
      border: brdr
    })
  }

  const handlePwConfirmChange = (e) => {
    const pw = e.target.value
    const pwGood = passwordRef.current.value === pw
    console.log(pwGood)

    const brdr = pwGood ? "1px solid green" : "1px solid red"
    setPwConfirmStyle({
      border: brdr
    })
    // if (pwGood) {
    //   setPwConfirmStyle({
    //     border: "1px solid green"
    //   })
    // } else {
    //   setPwConfirmStyle({
    //     border: "1px solid red"
    //   })      
    // }
  }

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
          <h2 className="text-center mb-4">Register</h2>
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
              <Form.Control style={pwStyle} onChange={handlePwChange} type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="confirm-password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control style={pwConfirmStyle} onChange={handlePwConfirmChange} type="password" ref={confirmPasswordRef} required />
            </Form.Group>
            {errorMsg && (
              <Alert
                variant="danger"
                onClose={() => setErrorMsg("")}
                dismissible>
                {errorMsg}
              </Alert>
            )}
            {msg && (
              <Alert variant="success" onClose={() => setMsg("")} dismissible>
                {msg}
              </Alert>
            )}
            <div className="text-center mt-2">
              <Button disabled={loading} type="submit" className="w-50">
                Register
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already a User? <Link to={"/login"}>Login here</Link>
      </div>
    </div>
  );
};

export default Register;
