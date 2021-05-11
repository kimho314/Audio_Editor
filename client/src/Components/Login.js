import React, { useState } from 'react';
import { Link } from "react-router-dom";


const Login = ({ setHasCookie }) => {
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');

    const loginApi = (user) => {
        return fetch('http://localhost:3001/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(user)
        }).then(response => response.json());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId || !userPw) {
            return;
        }

        try {
            const response = await loginApi({
                id: userId,
                password: userPw
            });

            if (response.result === 'ok') {
                setHasCookie(true);
                localStorage.setItem('userId', userId);
            } else {
                console.log(response.result);
                alert('로그인에 실패했습니다.');
                setUserId('');
                setUserPw('');
            }
        } catch (err) {
            setUserId('');
            setUserPw('');
            console.error('login error', err);
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="user_id"
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                    placeholder="id"
                />
                <input
                    type="password"
                    name="user_pw"
                    value={userPw}
                    onChange={e => setUserPw(e.target.value)}
                    placeholder="pw"
                />
                <button type="submit">Login</button>
            </form>
            <span style={{ marginRight: '5px' }}><Link to="/signup">회원가입</Link></span>
            <span style={{ marginLeft: '5px' }}><Link to="/changePw">비밀번호변경</Link></span>
        </div>
    );
};

export default Login;