import react, { useState } from "react"
import '../Login/Login.css'
import axios from 'axios'


function Login() {
    const [username, setUsername] = useState('')
    const [password, setpassword] = useState('')

    function handleSubmit(event) {
        event.preventDefault()
        axios.post('http://localhost:8081/login', {username, password})
        .then(res => {console.log(res)
            if(res.data === "Login success") {
            }
        })
        .catch(err => {console.log(err)})
    }

    return (
        <div className="form">
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form_username">
                        <label htmlFor="username">Username</label>
                        <input type="username" placeholder="Enter username" onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div className="form_password">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter password" onChange={e => setpassword(e.target.value)}/>
                    </div>
                    <button className="form_button">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login