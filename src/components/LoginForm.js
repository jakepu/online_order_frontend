import React, {Component} from 'react';
import { Form, Input, Button, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from "../utils";
class LoginForm extends Component {
    state = {
        loading: false,
    }
    onFinish = (data) => {
        this.setState({
            loading: true,
        });
        login(data)
            .then(() => {
                message.success(`Login Successful`);
                this.props.onSuccess();
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                this.setState({
                    loading: false,
                });
            });
    };

    render() {
        return (
            <Form
                name="normal_login"
                className="login-form"
                style={{
                    width: 300,
                    margin: "auto",
                }}
                onFinish={this.onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button"
                    loading={this.state.loading}>
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

export default LoginForm;