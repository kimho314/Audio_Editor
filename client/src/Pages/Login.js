import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Form, Button, Card } from "react-bootstrap";
import ApiUtil from "../Utils/ApiUtil";

const Login = ({ setHasCookie }) => {
	const [userId, setUserId] = useState("");
	const [userPw, setUserPw] = useState("");

	// const loginApi = (user) => {
	// 	return fetch("http://localhost:3001/login", {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		credentials: "include",
	// 		body: JSON.stringify(user),
	// 	}).then((response) => response.json());
	// };

	const handleSubmit = async (e) => {
		e.preventDefault();
		// validation
		if (!userId || !userPw) {
			return;
		}
		// api call
		let jsonData = { id: userId, password: userPw };
		let apiLogin = await ApiUtil(
			"post",
			"http://localhost:3001/api/login",
			jsonData
		);
		// save token
		if (apiLogin.result === "ok") {
			setHasCookie(true);
			localStorage.setItem("userId", userId);
			// if login failed
		} else {
			alert("로그인에 실패했습니다.");
			setUserId("");
			setUserPw("");
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
