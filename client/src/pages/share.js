import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Share() {
  const [Account, setAccount] = useState("");
  const [Endtime, setEndtime] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    console.log("Email:", Account);
    console.log("Textarea Value:", Endtime);
    // You can add more logic or send the data to a server
  };

  return (
    <div className="App">
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Share with Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Address"
            autoFocus
            value={Account}
            onChange={(e) => setAccount(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>End time</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={Endtime}
            onChange={(e) => setEndtime(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <br /><br />
      <p>This is The Share Page</p>
      <Link to="/">Back to Home Page</Link>
    </div>
  );
}

export default Share;
