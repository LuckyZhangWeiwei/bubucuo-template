import React from "react";
import { Layout, Spin } from "antd";
import { Outlet } from "react-router-dom";

import Login from "./Login/Login";
import useGlobalStore from "src/store/globalStore/globalStore";

const { Header } = Layout;
export default function RequireAuth() {
    const loading = useGlobalStore((state) => state.loading);
    const headerStyle: React.CSSProperties = {
        textAlign: "right",
        color: "#fff",
        height: 64,
        paddingInline: 10,
        lineHeight: "64px",
        // backgroundColor: "",
    };
    return (
        <Layout>
            {loading && (
                <div className="absolute inset-0 bg-slate-100/50 flex items-center justify-center z-50 text-xl">
                    <Spin size="large" />
                </div>
            )}
            <Header className="bg-white shadow-2xl" style={headerStyle}>
                <Login />
            </Header>

            <Outlet />
        </Layout>
    );
}
