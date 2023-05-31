import { useEffect }  from 'react'
import { notification,  } from 'antd';
import { ArgsProps } from "antd/es/notification/interface";

import { useAppSelector, useAppDispatch } from './hook';

import Main1 from './containers/Main1';
import Main2 from './containers/Main2';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes, Router } from 'react-router-dom';
import { VideoPage } from './containers/Video';
import { LoginPage } from './containers/Login';
import { RegisterPage } from './containers/Register';
import { hidden } from './core/slices/messageGlobal';

function App() {

    const dispatch = useAppDispatch();
    const [api, contextHolder] = notification.useNotification();

    const message = useAppSelector((state) => state.message.message);
    useEffect(() => {
        if(message) {
            const messageShow: ArgsProps = {
                message: message.title,
                description: message.content,
                placement: 'topRight',
            }
            switch(message.type) {
                case 'success':
                    api.success(messageShow);
                    break;
                case 'error':
                    api.error(messageShow);
                    break;
                case 'info':
                    api.info(messageShow);
                    break;
                case 'warning':
                    api.warning(messageShow);
                    break;
            }
            dispatch(hidden());
        }
    }, [message])
    
    return (
        <>
            {contextHolder}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main2 />}> 
                        <Route path="" index element={<VideoPage />} />
                    </Route>
                    <Route path="/" element={<Main1 />}>
                        <Route path="login" element={<LoginPage/>} />
                        <Route path="signup" element={<RegisterPage/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
