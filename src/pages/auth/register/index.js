import React, { useState } from 'react'
import { auth } from '../../../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Form, Button, Input, Flex } from 'antd'
import { regexpValidation, ROUTE_CONSTANTS } from '../../../core/utils/constants';
import { Link, useNavigate } from 'react-router-dom';
import AuthWrapper from '../../../components/sheard/AuthWrapper';
import registerBanner from '../../../core/images/auth-register.jpg'


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
        <AuthWrapper title="Sign Up" banner={registerBanner}>
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
                    tooltip="Password must be 6-16 characters long, contain at least one digit, one special character (!@#$%^&*), and may include uppercase and lowercase letters."
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

                <Form.Item
                    label="Confirm Password"
                    name="confirm"
                    dependencies={['password']}
                    rules={[{
                        required: true,
                        message: 'Please input your Password'
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve()
                            }

                            return Promise.reject(new Error('The new password that you entered do not match'))
                        }
                    })
                    ]}
                >
                    <Input.Password placeholder='Confirm Password' />
                </Form.Item>

                <Flex align='center' justify="flex-end" gap='10px'>
                    <Link to={ROUTE_CONSTANTS.LOGIN}>Sign In</Link>

                    <Button type='primary' htmlType='submit' loading={loading}>
                        Sign Up
                    </Button>
                </Flex>
            </Form>
        </AuthWrapper>
    )
}


export default Register