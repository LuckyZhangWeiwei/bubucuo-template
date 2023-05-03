import React from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

import Login from './Login/Login'

const { Header } = Layout
export default function RequireAuth() {
    const headerStyle: React.CSSProperties = {
        textAlign: "right",
        color: "#fff",
        height: 64,
        paddingInline: 10,
        lineHeight: "64px",
        backgroundColor: "black",
    };
    return (
        <Layout>
            <Header style={headerStyle}>
                <Login />
            </Header>

            <Outlet />
        </Layout>
    )
}
