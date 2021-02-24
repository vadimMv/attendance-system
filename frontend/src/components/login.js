import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useContext , useState } from "react";
import { AppContext } from "../state/context";
const Login = () => {
  const { state, createLogin } = useContext(AppContext);
  const [ user, setUser ]= useState({
    name: "",
    password: "",
    email: "",
  });
  const submit = (e) => {
    e.preventDefault();
    createLogin(user);
  };

  const change = (e) => {
    const el = e.target.name;
    const { value } = e.target;

    setUser((user) => {
      return {
        ...user,
        [el]: value,
      };
    });
  };

  return (
    <Form onSubmit={submit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={change}
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={change}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          onChange={change}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default Login;
