import { useEffect, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import ColorPickerModal from "./ColorPickerModal";

const ProfileForm = () => {
    const { user } = useAuth()
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [showColorPickerModal, setShowColorPickerModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setEmail(user.email)
    }, [])

    const handleCloseColorPickerModal = () => {
        console.log(handleClose)
        setShowColorPickerModal(false)
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        // try {
        //   setErrorMsg("");
        //   setLoading(true);
        //   if (!passwordRef.current?.value || !emailRef.current?.value) {
        //     setErrorMsg("Please fill in the fields");
        //     return;
        //   }
        //   const {
        //     data: { user, session },
        //     error
        //   } = await login(emailRef.current.value, passwordRef.current.value);
        //   if (error) setErrorMsg(error.message);
        //   if (user && session) navigate("/");
        // } catch (error) {
        //   setErrorMsg("Email or Password Incorrect");
        // }
        setLoading(false);
    };

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Card style={{
                width: "50%",
                marginTop: "1rem",
                borderRadius: "5rem"
            }}>
                <Card.Body className="d-flex m-4 p-4">
                    <h2 className="text-center mb-4">Profile</h2>
                    <Form onSubmit={handleSubmit} style={{
                        width: "50%",
                        margin: "0 auto"
                    }}>
                        <Form.Group id="firstName">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                type="text"
                                value={firstName}
                                required
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group id="lastName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                type="text"
                                value={lastName}
                                required
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group id="password" style={{
                            textAlign: "center",
                            marginTop: "1rem"
                        }}>
                            <Button
                                style={{
                                    width: "50%"
                                }}
                                className="btn-secondary">Change password</Button>
                        </Form.Group>
                        <Button style={{
                            width: "100%",
                            marginTop: "1rem"
                        }}>Update information</Button>
                        {errorMsg && (
                            <Alert
                                variant="danger"
                                onClose={() => setErrorMsg("")}
                                dismissible>
                                {errorMsg}
                            </Alert>
                        )}
                    </Form>

                    <ColorPickerModal 
                    show={showColorPickerModal} 
                    handleClose={handleCloseColorPickerModal}
                    />
                </Card.Body>
            </Card>
        </div>
    );
}

export default ProfileForm




