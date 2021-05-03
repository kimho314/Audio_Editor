import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Signup = () => {
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [userName, setUserName] = useState('');
    const [isSignupSuccess, setSignupSuccess] = useState(false);

    const createUserApi = (user) => {
        return fetch('/signup', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());
    };

    const isValid = () => {
        if (userId === '' || userPw === '' || userName === '') {
            return false;
        }

        let pwRegex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
        if (!pwRegex.text(userPw)) {
            return false;
        }

        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValid) {
            alert('회원정보가 잘못되었습니다!!!');
            return;
        }

        try {
            const response = await createUserApi({
                id: userId,
                password: userPw,
                userName: userName
            });

            console.log("createUserApi: ");
            console.log(response);

            if (response.result === 'ok') {
                setSignupSuccess(true);
            } else {
                alert('회원가입에 실패하였습니다. 잠시 후 다시 시도해주세요.');
            }
        } catch (err) {
            console.log('login error: ', err);
        }
    }

    return (
        <div>
            {!isSignupSuccess && (
                <>
                    <h2>Singup</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text"
                            name="user_id"
                            value={userId}
                            onChange={e => setUserId(e.target.value)}
                            placeholder="id"
                        />
                        <input type="password"
                            name="user_pw"
                            value={userPw}
                            onChange={e => setUserPw(e.target.value)}
                            placeholder="pw"
                        />
                        <input type="text"
                            name="user_name"
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
                            placeholder="name"
                        />
                        <button type="submit">제출</button>
                    </form>
                    <Link to="login">로그인</Link>
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