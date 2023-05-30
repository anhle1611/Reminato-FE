import { useAppDispatch } from '../../hook';
import { Navigate  } from 'react-router-dom';
import { Card, Form, Input, Button, } from 'antd';

import { isAuthenticated } from '../../services/auth';
import { authenticateUser } from './slice';

import styles  from './style.module.css'

export function LoginPage() {

    const dispatch = useAppDispatch();

    if (isAuthenticated()) {
        return <Navigate to="/" />;
    }

    const onFinish = (values: any) => {
        dispatch(authenticateUser(values));
    };

    return (
            <Card hoverable={true} title="Authentication" className={styles.login_card} style={{ width: '500px', top: '30%'}}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="name"
                        rules={[{ required: true, message: 'Please input your username!'} ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>


                    <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <a href="/signup">Don't have an account? Sign up.</a>
            </Card>
    )
}
