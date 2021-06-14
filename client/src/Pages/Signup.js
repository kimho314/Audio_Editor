import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Form, Button, Card } from "react-bootstrap";

const Signup = () => {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userName, setUserName] = useState("");
  const [isSignupSuccess, setSignupSuccess] = useState(false);

  const createUserApi = (user) => {
    return fetch("http://localhost:3001/api/signup", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((response) => response.json());
  };

  const isValid = () => {
    if (userId === "" || userPw === "" || userName === "") {
      alert("회원 정보를 입력해주십시오!");
      return false;
    }

    // 8~15자리, 숫자/영문자/특수기호 조합
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
      // alert('회원정보가 잘못되었습니다!!!');
      return;
    }

    try {
      const response = await createUserApi({
        id: userId,
        password: userPw,
        userName: userName,
      });

      console.log("createUserApi: ");
      console.log(response);

      if (response.result === "ok") {
        setSignupSuccess(true);
      } else {
        alert("회원가입에 실패하였습니다. 잠시 후 다시 시도해주세요.");
      }
    } catch (err) {
      console.log("login error: ", err);
    }
  };

  return (
    <div>
      {!isSignupSuccess && (
        <>
          <Card style={{ marginTop: "10rem", width: "100%", height: "660px" }}>
            <Card.Header style={{ fontSize: "24px", fontWeight: "500" }}>
              Sign Up
            </Card.Header>
            <Card.Body className="p-5">
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="userIdForm">
                  <Form.Label>Id</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Id"
                    onChange={(e) => setUserId(e.target.value)}
                  />
                  <Form.Text className="text-muted">set your id</Form.Text>
                </Form.Group>

                <Form.Group controlId="userPasswordForm">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setUserPw(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    set your password
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="userPasswordConfirmForm">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                  <Form.Text className="text-muted">
                    confirm your password
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="usernameForm">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    set your username
                  </Form.Text>
                </Form.Group>

                <div className="d-flex align-items-center justify-content-between mt-5">
                  <span style={{ marginRight: "15px" }}>
                    <Link to="login">Back to Login Page</Link>
                  </span>
                  <Button variant="outline-primary" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          {/* <h2>Sign Up</h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="userIdForm">
              <Form.Label>Id</Form.Label>
              <Form.Control
                type="text"
                placeholder="Id"
                onChange={(e) => setUserId(e.target.value)}
              />
              <Form.Text className="text-muted">set your id</Form.Text>
            </Form.Group>

            <Form.Group controlId="userPasswordForm">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setUserPw(e.target.value)}
              />
              <Form.Text className="text-muted">set your password</Form.Text>
            </Form.Group>

            <Form.Group controlId="userPasswordConfirmForm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
              <Form.Text className="text-muted">
                confirm your password
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="usernameForm">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                onChange={(e) => setUserName(e.target.value)}
              />
              <Form.Text className="text-muted">set your username</Form.Text>
            </Form.Group>

            <div className="d-flex align-items-center">
              <span style={{ marginRight: "5px" }}>
                <Link to="login">Back to Login Page</Link>
              </span>

              <Button variant="outline-primary" type="submit">
                Submit
              </Button>
            </div>
          </Form> */}
        </>
      )}
      {isSignupSuccess && (
        <div>
          <p>회원가입을 축하합니다!</p>
          <Link to="login">로그인</Link>
        </div>
      )}
    </div>
  );
};

export default Signup;
