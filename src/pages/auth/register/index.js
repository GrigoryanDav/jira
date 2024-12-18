import React, { useState } from 'react'
import { auth, db } from '../../../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Form, Button, Input, Flex, Progress } from 'antd'
import { regexpValidation, ROUTE_CONSTANTS, FIRESTORE_PATH_NAMES } from '../../../core/utils/constants';
import { setDoc, doc } from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom';
import AuthWrapper from '../../../components/sheard/AuthWrapper';
import registerBanner from '../../../core/images/auth-register.jpg'


const Register = () => {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const [passwordStrength, setPasswordStrength] = useState(0)


    const checkPasswordStrength = (value) => {
        let strength = 0
        if (value.length >= 1) strength += 20
        if (value.length >= 10) strength += 20
        if (/[A-Z]/.test(value)) strength += 20
        if (/[0-9]/.test(value)) strength += 20
        if (/[!@#$%^&*]/.test(value)) strength += 20

        setPasswordStrength(strength)
    }

    const handlePasswordChange = (e) => {
        checkPasswordStrength(e.target.value.trim())
    }

    const handleRegister = async (values) => {
        setLoading(true)
        const { firstName, lastName, email, password } = values
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            const { uid } = response.user
            const createdDoc = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid)
            await setDoc(createdDoc, {
                uid, firstName, lastName, email,
            });

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
                        message: 'Please input your First Name'
                    }]}
                >
                    <Input type='text' placeholder='First Name' />
                </Form.Item>

                <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[{
                        required: true,
                        message: 'Please input your Last Name'
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
                    <Input.Password placeholder='Password' onChange={handlePasswordChange} />
                </Form.Item>

                {
                    form.getFieldValue('password') && (
                        <Progress
                            percent={passwordStrength}
                            showInfo={false}
                            strokeColor={
                                passwordStrength < 40 ? 'red' : passwordStrength < 80 ? 'orange' : 'green'
                            }
                        />
                    )
                }

                {
                    form.getFieldValue('password') && (
                        <p style={{ color: passwordStrength < 40 ? 'red' : passwordStrength < 80 ? 'orange' : 'green' }}>
                            {
                                passwordStrength < 40 ? 'Weak password' : passwordStrength < 80 ? 'Medium password' : 'Strong Password'
                            }
                        </p>
                    )
                }


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