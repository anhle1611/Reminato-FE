import { useAppDispatch } from '../../hook';
import { Navigate  } from 'react-router-dom';
import { Breadcrumb, theme } from 'antd';

import { isAuthenticated } from '../../services/auth';


export function VideoPage() {

    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    
    return (
        <>
            <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-content" style={{ background: colorBgContainer }}>
            Content
            </div>
        </>
    )
}
