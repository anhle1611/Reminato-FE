import { useEffect, useState }  from 'react'
import { notification,  } from 'antd';
import { ArgsProps } from "antd/es/notification/interface";
import actionCable from 'actioncable';

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
import { Video } from './containers/Video/type';

interface NotificationTypes {
    data: Video
}

const CABLE_URL = import.meta.env.VITE_CABLE_URL;

function App() {

    const dispatch = useAppDispatch();
    const [api, contextHolder] = notification.useNotification();

    const message = useAppSelector((state) => state.message.message);
    const userLogin = useAppSelector((state) => state.authentication.userLogin);
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

    const cableApp = actionCable.createConsumer(CABLE_URL);

    const [channel, setChannel] = useState<null | actionCable.Channel>(null);
    useEffect(() => {
        if (channel !== null) channel.unsubscribe();
        setChannel(
            cableApp.subscriptions.create(
            {
                channel: 'ShareVideoChannel',
            },
            {
                received: (data: NotificationTypes) => {
                    if(userLogin) {
                        console.log(userLogin)
                        api.warning({
                            message: "Notification",
                            description: `New video share: "${data.data.title}"`,
                            placement: 'topRight',
                        });
                    }
                },
            },
            ),
        );
    }, []);
    
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
