import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Form, Button, Card } from "react-bootstrap";

const Login = ({ setHasCookie }) => {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");

  const loginApi = (user) => {
    return fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    }).then((response) => response.json());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !userPw) {
      return;
    }

    try {
      const response = await loginApi({
        id: userId,
        password: userPw,
      });

      if (response.result === "ok") {
        setHasCookie(true);
        localStorage.setItem("userId", userId);
      } else {
        console.log(response.result);
        alert("로그인에 실패했습니다.");
        setUserId("");
        setUserPw("");
      }
    } catch (err) {
      setUserId("");
      setUserPw("");
      console.error("login error", err);
    }
  };

  return (
    <div>
      <Card style={{ marginTop: "10rem", width: "100%", height: "400px" }}>
        <Card.Header style={{ fontSize: "24px", fontWeight: "500" }}>
          Log In
        </Card.Header>
        <Card.Body className="p-5">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="userIdForm">
              <Form.Label>User Id</Form.Label>
              <Form.Control
                type="text"
                placeholder="Id"
                onChange={(e) => setUserId(e.target.value)}
              />
              {/* <Form.Text className="text-muted">user id</Form.Text> */}
            </Form.Group>

            <Form.Group controlId="userPasswordForm">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setUserPw(e.target.value)}
              />
              {/* <Form.Text className="text-muted">user password</Form.Text> */}
            </Form.Group>

            <div className="float-right">
              <div className="d-flex align-items-center mt-5">
                <span style={{ marginRight: "15px" }}>
                  <Link to="/signup">회원가입</Link>
                </span>
                <span style={{ marginRight: "25px" }}>
                  <Link to="/changePw">비밀번호변경</Link>
                </span>
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
