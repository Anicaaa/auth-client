import './App.css';
import { useState } from 'react';
import Form from './components/Form';
import Input from './components/Input';

export default function App() {
    const [user, setUser] = useState({ username: '', password: '' });
    const [loginUser, loginSetUser] = useState({ username: '', password: '' });
    const [registerResponse, setRegisterResponse] = useState('');
    const [loginResponse, setLoginResponse] = useState('');

    const register = async (e) => {
        e.preventDefault();
        // Write your register code here
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        }
        await fetch(`http://localhost:4000/register`, opts)
        .then((res) => res.json())
        .then((userData) => {
            console.log("LOOK HERE:", userData)
            setRegisterResponse(
                `Thank you ${userData.data.username}. You have successfully registered.`
            )
        })
    };

    const login = async (e) => {
        e.preventDefault();
        // Write your register code here
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginUser),
        }
        await fetch(`http://localhost:4000/login`, opts)
        .then((res) => res.json())
        .then((userDataLogin) => {
            console.log("LOOK HERE:", userDataLogin)
            setLoginResponse(
                `Thank you ${loginUser.username}. Your token is ${userDataLogin.data}`
            )
        })
    };
    






    // You can safely ignore everything below this line, it's just boilerplate
    // so you can focus on the exercise requirements

    const handleChange = (e) => {
        const { value, name } = e.target;

        setUser({
            ...user,
            [name]: value
        });
    }

        const handleLoginChange = (e) => {
        const { value, name } = e.target;

        loginSetUser({
            ...loginUser,
            [name]: value
        });
    }


    return (
        <div className="App">

            <h1>Register</h1>

            <Form
                handleSubmit={register}
                inputs={[
                    <Input
                        key={1}
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={user.username}
                        handleChange={handleChange}
                    />,
                    <Input
                        key={2}
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={user.password}
                        handleChange={handleChange}
                    />
                ]}
            />

            {registerResponse && <p>{registerResponse}</p>}

            <h1>Login</h1>

            <Form
                handleSubmit={login}
                inputs={[
                    <Input
                        key={1}
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={loginUser.username}
                        handleChange={handleLoginChange}
                    />,
                    <Input
                        key={2}
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={loginUser.password}
                        handleChange={handleLoginChange}
                    />
                ]}
            />

            {loginResponse && <p>{loginResponse}</p>}

        </div>
    );
}
