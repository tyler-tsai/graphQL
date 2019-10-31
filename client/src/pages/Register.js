import React, { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";

export default function Register(props) {
  const context = useContext(AuthContext);
  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  };
  const [errors, setErrors] = useState({});
  const { onChange, onSubmit, values } = useForm(registerUser, initialState);
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(
      _,
      {
        data: { register: userData }
      }
    ) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });
  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          vale={values.username}
          type="text"
          onChange={onChange}
          error={Boolean(errors.username)}
        />
        <Form.Input
          label="Email"
          placeholder="Email.."
          name="email"
          type="text"
          vale={values.email}
          onChange={onChange}
          error={Boolean(errors.email)}
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          type="password"
          name="password"
          vale={values.password}
          onChange={onChange}
          error={Boolean(errors.password)}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password.."
          name="confirmPassword"
          type="password"
          vale={values.confirmPassword}
          onChange={onChange}
          error={Boolean(errors.confirmPassword)}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map(value => {
              return <li key={value}>{value}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
