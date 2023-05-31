import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Avatar } from 'antd';

import { logoutUser } from '../../core/slices/authGlobal';
import { useAppDispatch } from '../../hook';

const items: MenuProps['items'] = [
    {
        label: 'Home',
        key: 'home',
        icon: <MailOutlined />,
    },
    {
        label: 'Navigation Two',
        key: 'app',
        icon: <AppstoreOutlined />,
        disabled: true,
    },
    {
        label: 'Navigation Three - Submenu',
        key: 'SubMenu',
        icon: <SettingOutlined />,
        children: [
            {
                type: 'group',
                label: 'Item 1',
                children: [
                {
                    label: 'Option 1',
                    key: 'setting:1',
                },
                {
                    label: 'Option 2',
                    key: 'setting:2',
                },
                ],
            },
            {
                type: 'group',
                label: 'Item 2',
                children: [
                {
                    label: 'Option 3',
                    key: 'setting:3',
                },
                {
                    label: 'Option 4',
                    key: 'setting:4',
                },
                ],
            },
        ],
    },
    {
        label: (
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
            Navigation Four - Link
        </a>
        ),
        key: 'alipay',
    },
];

const App: React.FC = () => {
    const dispatch = useAppDispatch();

    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const logOut: MenuProps['onClick'] = () => {
        dispatch(logoutUser());
    }

    return (
        <Menu 
            theme="dark"
            onClick={onClick} 
            selectedKeys={[current]} 
            defaultSelectedKeys={['home']} 
            mode="horizontal" 
            style={{ display: 'block', width: '100%' }}
        >
            <Menu.Item key="home" style={{ float: 'left' }}icon={<HomeOutlined />}>Home</Menu.Item>
            <Menu.Item key="logout" style={{ float: 'right' }} onClick={logOut}>Logout</Menu.Item>
            <Menu.Item key="avatar" style={{ float: 'right' }}><Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} /></Menu.Item>
        </Menu>
    );
};

export default App;