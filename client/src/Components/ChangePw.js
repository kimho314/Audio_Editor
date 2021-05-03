import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const ChangePw = () => {
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');

    const changePwApi = (user) => {
        return fetch('changePw', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => response.json());
    };

    const isValid = () => {
        if (userId === '' || userPw === '') {
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
            return;
        }

        try {
            const response = await changePwApi({
                id: userId,
                password: userPw
            });

            if (response.result === 'ok') {
                console.log(response.data);
                alert('패스워드 변경 성공')
            } else {
                console.log(response.result);
                alert('패스워드 변경 실패');
            }
            setUserId('');
            setUserPw('');
        } catch (err) {
            setUserId('');
            setUserPw('');
            console.error('password change error', err);
        }
    }

    return (
        <div>
            <h2>패스워드 변경</h2>
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
                <button type="submit">Change Password</button>
            </form>
            <Link to="/login">로그인</Link>
        </div>
    )
}

export default ChangePw;