import React, { useState } from 'react'
import { auth } from '../../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Form, Button, Input, Checkbox } from 'antd'
import { regexpValidation, ROUTE_CONSTANTS } from '../../core/utils/constants';
import { Link, useNavigate } from 'react-router-dom';
import signUpImage from './Images/signup-image.jpg'
import './index.css'


const Register = () => {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()
    const navigate = useNavigate()

    const handleRegister = async (values) => {
        setLoading(true)
        const { email, password } = values
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            navigate(ROUTE_CONSTANTS.LOGIN)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='register'>
            <div className='register_container'>
                <div className='auth_container'>
                    <div className='register_title'>
                        <h1>Sign Up</h1>
                    </div>
                    <Form layout='vertical' form={form} onFinish={handleRegister}>
                        <Form.Item
                            label="First Name"
                            name="firstName"
                            rules={[{
                                required: true,
                                message: 'Please input your Email'
                            }]}
                        >
                            <Input type='text' placeholder='First Name' />
                        </Form.Item>

                        <Form.Item
                            label="Last Name"
                            name="lastName"
                            rules={[{
                                required: true,
                                message: 'Please input your Email'
                            }]}
                        >
                            <Input type='text' placeholder='Last Name' />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{
                                required: true,
                                message: 'Please input your Email'
                            }]}
                        >
                            <Input type='text' placeholder='Email' />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{
                                required: true,
                                message: 'Please input your Password'
                            },
                            {
                                pattern: regexpValidation,
                                message: 'Wrong password'
                            }
                            ]}
                        >
                            <Input.Password placeholder='Password' />
                        </Form.Item>
                        <Form.Item>
                            <Checkbox> I agree all statements in Terms of service</Checkbox>
                        </Form.Item>

                        <Button type='primary' htmlType='submit' loading={loading}>
                            Sign Up
                        </Button>

                        <Link to={ROUTE_CONSTANTS.LOGIN}><p>Already have an account?</p></Link>
                    </Form>
                </div>
                <div className='register_image_container'>
                    <img src={signUpImage} alt='signup-image' />
                </div>
            </div>
        </div>
    )
}


export default Register