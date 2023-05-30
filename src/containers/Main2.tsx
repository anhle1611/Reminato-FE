import { Outlet } from "react-router-dom";
import {  Layout } from 'antd';

import HeaderContent from '../components/headers/Header2';

import './main2.css';

function Main2() {
    const { Header, Content, Footer } = Layout;
    return (
        <>
            <Layout className="layout"  style={{ height: '100%'}}>
                <Header style={{ display: 'flex', alignItems: 'center' }}>
                    <HeaderContent />
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </>
    )
}

export default Main2
  