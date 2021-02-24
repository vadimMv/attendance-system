import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { useContext, useState } from "react";
import { AppContext } from "../state/context";
const Report = () => {
  const { state, createReport } = useContext(AppContext);
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const click = (e) => {
    createReport({
      type: e.target.name,
      date,
    });
  };

  const change = (e) => {
    setDate(e.target.value);
  };
  return (
    <Form>
      <Form.Row className="mt-4 mb-4 ml-5">
        <Col>
          <h2> Today is {new Date().toISOString().substr(0, 10)} </h2>
        </Col>
      </Form.Row>
      <Form.Row className="mb-4 ml-5">
        <Col>
          <input
            type="date"
            defaultValue={new Date().toISOString().substr(0, 10)}
            onChange={change}
          />
        </Col>
      </Form.Row>
      <Form.Row className="mb-4">
        <Button variant="success" size="lg" block name="start" onClick={click}>
          Start Day
        </Button>
      </Form.Row>
      <Form.Row className="mb-4">
        <Button variant="danger" size="lg" block name="end" onClick={click}>
          End Day
        </Button>
      </Form.Row>
      <Form.Row className="mb-4">
        <Button variant="dark" size="lg" block name="exit" onClick={click}>
          Exit
        </Button>
      </Form.Row>
    </Form>
  );
};

export default Report;
