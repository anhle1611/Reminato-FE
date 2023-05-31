import { useEffect, useState }  from 'react'
import { Navigate, useNavigate  } from 'react-router-dom';
import { Avatar, Divider, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useAppDispatch, useAppSelector } from '../../hook';
import { loadListVideo } from './slice';
import { Video } from './Video';
import { ModalCreate } from './ModalShare';

import './style.css'


export function VideoPage() {
    const navigate = useNavigate();
    const userLogin = useAppSelector((state) => state.authentication.userLogin);
    
    if (!userLogin) {
        navigate('login');
    }

    const dispatch = useAppDispatch();
    const videoData = useAppSelector((state) => state.video.videos);
    const totaPage = useAppSelector((state) => state.video.totaPage);

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(loadListVideo({page, limit: 3}));
    }, []);

    const loadMoreData = () => {
        console.log("vao day");
        
        if (loading) {
            return;
        }
        const nextPage = page+1
        setLoading(true);
        setPage(nextPage);
        dispatch(loadListVideo({page: nextPage, limit: 3}))
        setLoading(false);
    };

    return (
        <>
        <ModalCreate />
            <div
                id="scrollableDiv"
                style={{
                    height: '100%',
                    width: '100%',
                    overflow: 'auto',
                    padding: '0 16px',
                    border: 'none',
                }}
                className='box'
            >
            <InfiniteScroll
                dataLength={videoData.length}
                next={loadMoreData}
                hasMore={page < totaPage}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                dataSource={videoData}
                renderItem={(item) => (
                    <List.Item key={item.id}>
                        <Video video={item} user={userLogin} />
                    </List.Item>
                )}
                />
            </InfiniteScroll>
            </div>
        </>
    )
}

    
