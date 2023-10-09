import { SketchPicker } from "react-color";
import { useState, useRef } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";

export default function ColorPickerModal({show, handleClose, color, setColor}) {
    const colorRef = useRef(null);
    const [loading, setLoading] = useState(false)

    console.log("show", show)

    const [sketchPickerColor, setSketchPickerColor] = useState({
        r: "241",
        g: "112",
        b: "19",
        a: "1",
      });

    const { r, g, b, a } = sketchPickerColor;

    const handleSubmit = async (e) => {
        console.log("SUBMIT");
        e.preventDefault();
        try {
          setErrorMsg("");
          setLoading(true);
          if (
            !colorRef
          ) {
            alert("Please fill in all the fields");
            return;
          }
          const eventToSave = {
            user_id: userId,
            name: nameRef.current.value,
            date: date || dateRef.current.value,
            amount: amountRef.current.value * 100,
            time: timeRef.current.value,
            description: descriptionRef.current.value
          };
          console.log(eventToSave);
          if (type === "Edit") {
            await editEvent(eventToSave)
          } else {
            await addEvent(eventToSave);
          }
        } catch (error) {
          console.error(error);
        }
        setLoading(false);
        handleClose();
      };

    return (




        <Modal show={show} onHide={handleClose} centered>
        <Modal.Header className="text-center" closeButton>
          <h2>Select Color</h2>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Card>
              <Card.Body>
                <Form.Group id="color">
                  <Form.Label>Event Color</Form.Label>
                  <Form.Control
                    type="text"
                    ref={colorRef}
                    defaultValue={event?.time ?? ""}
                    required
                  />
                </Form.Group>
                <div>
                    
             <SketchPicker
                onChange={(color) => {
                    setSketchPickerColor(color.rgb);
                }}
                color={sketchPickerColor}
            />
                </div>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button disabled={loading} variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>













        // <div>
        //     <h6>Color Picker</h6>
        //     {/* Div to display the color  */}
        //     <div
        //         style={{
        //             backgroundColor: `rgba(${r},${g},${b},${a})`,
        //             width: 100,
        //             height: 50,
        //             border: "2px solid white",
        //         }}
        //     ></div>

        //     <SketchPicker
        //         onChange={(color) => {
        //             setSketchPickerColor(color.rgb);
        //         }}
        //         color={sketchPickerColor}
        //     />
        // </div>
    )
}





// import { ColorPicker, useColor } from "react-color-palette"; 
// import "react-color-palette/css"; 
  
// export default function ColorPickerComponent(){ 
//   const [color, setColor] = useColor("hex", "#121212"); 
  
//   return ( 
//     <div> 
//         <h1 style={{ color: "{color}"}}>Color Picker - GeeksforGeeks</h1> 
//         <ColorPicker width={456} height={228}  
//                    color={color}  
//                    onChange={setColor} hideHSV dark />; 
//     </div> 
//   ) 
// };