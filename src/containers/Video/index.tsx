import { useEffect, useState }  from 'react'
import { Navigate, useNavigate  } from 'react-router-dom';
import { Avatar, Divider, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useAppDispatch, useAppSelector } from '../../hook';
import { loadListVideo } from './slice';
import { Video } from './Video';

import './style.css'


export function VideoPage() {
    const navigate = useNavigate();
    const userLoggin = useAppSelector((state) => state.authentication.userLogin);
    
    if (!userLoggin) {
        navigate('login');
    }

    const dispatch = useAppDispatch();
    const videoData = useAppSelector((state) => state.video);

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(loadListVideo({page, limit: 3}));
    }, []);

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        setPage(page+1)
        dispatch(loadListVideo({page, limit: 3}))
        setLoading(false);
    };

    return (
        <>
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
                dataLength={videoData.totalObjects}
                next={loadMoreData}
                hasMore={videoData.totalObjects < 50}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                dataSource={videoData.videos}
                renderItem={(item) => (
                    <List.Item key={item.id}>
                        <Video video={item} />
                    </List.Item>
                )}
                />
            </InfiniteScroll>
            </div>
        </>
    )
}

    
