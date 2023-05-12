import { Layout } from "antd";
import React from "react";
import LeftSide from "./components/LeftSider";
import Center from "./components/Center";
import RightSide from "./components/RightSide";
import Header from "./components/Header";

export default function EditPage() {
    return (
        <Layout>
            <Header></Header>
            <div className="relative flex justify-between h-full">
                <LeftSide />
                <Center />
                <RightSide />
            </div>
        </Layout>
    );
}
