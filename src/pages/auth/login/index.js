import { useState } from 'react'
import { Form, Input, Button, Flex } from 'antd'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../services/firebase'
import { ROUTE_CONSTANTS } from '../../../core/utils/constants'
import { Link } from 'react-router-dom'
import AuthWrapper from '../../../components/sheard/AuthWrapper'
import loginBanner from '../../../core/images/auth-login.jpg'


const Login = (setIsAuth) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const handleLogin = async values => {
        setLoading(true)
        try {
            const { email, password } = values
            await signInWithEmailAndPassword(auth, email, password)
            form.resetFields()
            setIsAuth(true)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }


    return (
        <AuthWrapper title="Sign In" banner={loginBanner}>
            <Form layout='vertical' form={form} onFinish={handleLogin}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{
                        required: true,
                        message: 'Please input your Email'
                    }]}
                >
                    <Input type='email' placeholder='Email' />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    tooltip="Password must be 6-16 characters long, contain at least one digit, one special character (!@#$%^&*), and may include uppercase and lowercase letters."
                    rules={[{
                        required: true,
                        message: 'Please input your Password'
                    },
                    ]}
                >
                    <Input.Password placeholder='Password' />
                </Form.Item>
                <Flex align='center' justify='flex-end' gap='10px'>
                    <Link to={ROUTE_CONSTANTS.REGISTER}>Create account</Link>

                    <Button type='primary' htmlType='submit' loading={loading}>
                        Sign In
                    </Button>
                </Flex>
            </Form>
        </AuthWrapper>
    )
}

export default Login