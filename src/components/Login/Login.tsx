import { Modal, Form, Input, Checkbox, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import useUserStore, {
    fetchUserInfo,
    login,
    logout,
} from "src/store/userStore/userStore";
import Axios from "src/api/axios";
import { registerEnd } from "src/api/api";

import "./Login.less";
import useGlobalStore from "src/store/globalStore/globalStore";

export default function Login() {
    const isLogin = useUserStore((state) => state.isLogin);
    const loading = useGlobalStore((state) => state.loading);
    useEffect(() => {
        fetchUserInfo();
    }, []);
    if (loading) {
        return null;
    }
    if (isLogin) {
        return (
            <Button style={{ float: "right", marginTop: 16 }} onClick={logout}>
                退出登录
            </Button>
        );
    }

    const onFinish = ({
        name,
        password,
        register_login,
    }: {
        name: string;
        password: string;
        register_login: boolean;
    }) => {
        if (register_login) {
            registerAndLogin({ name, password });
        } else {
            login({ name, password });
        }
    };
    const onFinishFalsed = (errorInfo: any) => {
        console.log("failed:", errorInfo);
    };
    const registerAndLogin = async (values: {
        name: string;
        password: string;
    }) => {
        const res = await Axios.post(registerEnd, values);
        if (res) {
            login(values);
        }
    };
    return (
        <Modal
            title="注册与登录"
            open={true}
            closable={false}
            footer={[]}
            width={400}
        >
            <Form
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 26,
                }}
                name="login-form"
                autoComplete="off"
                onFinish={onFinish}
                onFinishFailed={onFinishFalsed}
            >
                <p className="text-red-400 text-xs pb-2">登录账户后才能使用</p>
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: "请输入用户名！" }]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="用户名"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: "请输入密码！" }]}
                >
                    <Input.Password
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        placeholder="密码"
                    />
                </Form.Item>
                <Form.Item
                    name="register_login"
                    valuePropName="checked"
                    wrapperCol={{ offset: 7 }}
                >
                    <Checkbox className="red">注册并登录</Checkbox>
                </Form.Item>
                <Form.Item className="flex justify-center">
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
