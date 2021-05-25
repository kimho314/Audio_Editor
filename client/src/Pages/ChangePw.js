import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Form, Button, Card } from "react-bootstrap";

const ChangePw = () => {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");

  const changePwApi = (user) => {
    return fetch("http://localhost:3001/changePw", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    }).then((response) => response.json());
  };

  const isValid = () => {
    if (userId === "" || userPw === "") {
      alert("변경하실 비밀번호를 입력하여 주십시오!");
      return false;
    }

    let pwRegex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    if (!pwRegex.text(userPw)) {
      alert("비밀번호는 8~15자리, 숫자/영문자/특수기호 조합하여야 합니다!");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) {
      return;
    }

    try {
      const response = await changePwApi({
        id: userId,
        password: userPw,
      });

      if (response.result === "ok") {
        console.log(response.data);
        alert("패스워드 변경 성공");
      } else {
        console.log(response.result);
        alert("패스워드 변경 실패");
      }
      setUserId("");
      setUserPw("");
    } catch (err) {
      setUserId("");
      setUserPw("");
      console.error("password change error", err);
    }
  };

  return (
    <div>
      <Card style={{ marginTop: "10rem", width: "100%", height: "550px" }}>
        <Card.Header style={{ fontSize: "24px", fontWeight: "500" }}>
          Change Password
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
              <Form.Text className="text-muted">user id</Form.Text>
            </Form.Group>

            <Form.Group controlId="userPasswordForm">
              <Form.Label>Old Password</Form.Label>
              <Form.Control type="password" placeholder="Old Password" />
              <Form.Text className="text-muted">
                confirm your old password
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="userPasswordForm">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New Password"
                onChange={(e) => setUserPw(e.target.value)}
              />
              <Form.Text className="text-muted">set new password</Form.Text>
            </Form.Group>

            <div className="d-flex align-items-center justify-content-between mt-5">
              <span>
                <Link to="/login">Back to Login Page</Link>
              </span>

              <Button variant="outline-primary" type="submit">
                Change Password
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <h2></h2>
    </div>
  );
};

export default ChangePw;
