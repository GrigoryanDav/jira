import { useState } from "react";
import { Form, Input, Button } from 'antd'
import { auth } from "../../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { regexpValidation } from "../../core/utils/constants";
import { ROUTE_CONSTANTS } from "../../core/utils/constants";
import { Link } from "react-router-dom";


const Login = () => {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()

    const handleLogin = async (values) => {
        setLoading(true)
        try {
            const { email, password } = values
            await signInWithEmailAndPassword(auth, email, password)
            form.resetFields()
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Form layout="vertical" form={form} onFinish={handleLogin}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{
                        required: true,
                        message: 'Please input your Email'
                    }]}
                >
                    <Input type="email" placeholder="Email" />
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
                    }]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>

                <Button type="primary" htmlType="submit" loading={loading}>
                    Sign In
                </Button>

                <Link to={ROUTE_CONSTANTS.REGISTER}>
                    <Button>Register</Button>
                </Link>
            </Form>
        </div>
    )
}

export default Login