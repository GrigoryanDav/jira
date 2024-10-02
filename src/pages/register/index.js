import React from 'react'
import { auth } from '../../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Form, Button, Input, notification } from 'antd'
import './index.css'


class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            loading: false,
        }
    }

    handleChangeInput = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleRegister = async (e) => {
        e.preventDefault()
        console.log(this.state)
        this.setState({
            loading: true
        })

        const { email, password } = this.state
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch {
            notification.error()
        } finally {
            this.setState({
                loading: false
            })
        }
    }

    render() {
        const { loading } = this.state
        return (
            <div className='auth_container'>
                <Form layout="vertical" >
                    <Form.Item label="First Name">
                        <Input name='firstName' type='text' placeholder='First Name' onChange={this.handleChangeInput} />
                    </Form.Item>

                    <Form.Item label="Last Name">
                        <Input name='lastName' type='text' placeholder='Last Name' onChange={this.handleChangeInput} />
                    </Form.Item>

                    <Form.Item label="Email">
                        <Input name='email' type='email' placeholder='Email' onChange={this.handleChangeInput} />
                    </Form.Item>

                    <Form.Item label="Password">
                        <Input.Password name='password' type='password' placeholder='Password' onChange={this.handleChangeInput} />
                    </Form.Item>

                    <hr />
                    <Button type="primary" onClick={this.handleRegister}  loading={loading}>Register</Button>
                </Form>
            </div>
        )
    }
}

export default Register