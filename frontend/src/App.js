import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Login from "./components/login";
import Report from "./components/report";
import { useContext } from "react";
import { AppContext } from "./state/context";
function App() {
  const { state } = useContext(AppContext);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs md="8">
          {state.login == true ? <Report /> : <Login />}
        </Col>
      </Row>
    </Container>
  );
}

export default App;