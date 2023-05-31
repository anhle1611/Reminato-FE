import React, { useState } from 'react';
import { PlusOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Avatar } from 'antd';

import { logoutUser } from '../../core/slices/authGlobal';
import { openPopupCreate } from '../../containers/Video/slice';
import { useAppDispatch } from '../../hook';

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

    const openModalShare = () => {
        dispatch(openPopupCreate(true));
    }

    return (
        <Menu 
            theme="dark"
            onClick={onClick} 
            selectedKeys={[current]} 
            defaultSelectedKeys={['videos']} 
            mode="horizontal" 
            style={{ display: 'block', width: '100%' }}
        >
            <Menu.Item key="videos" style={{ float: 'left' }}icon={<HomeOutlined />}><a href="/" rel="noopener noreferrer">Home</a></Menu.Item>
            <Menu.Item key="createVideo" style={{ float: 'left' }}icon={<PlusOutlined />} onClick={openModalShare}>Share Video</Menu.Item>
            <Menu.Item key="logout" style={{ float: 'right' }} onClick={logOut}>Logout</Menu.Item>
            <Menu.Item key="avatar" style={{ float: 'right' }}><Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} /></Menu.Item>
        </Menu>
    );
};

export default App;