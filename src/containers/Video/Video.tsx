import { Card, Col, MenuProps, Row } from 'antd';
import {
    LikeOutlined,
    DislikeOutlined
} from '@ant-design/icons';

import { Video } from './type';
import { Iframe } from '../../components/Iframe';
import { likeVideo } from './slice';
import { useAppDispatch } from '../../hook';
import { userState } from '../../core/interfaces/auth';

export function Video({ video, user }: {video: Video, user: userState}) {

    const dispatch = useAppDispatch();

    const onLike = () => {
        if(video.likes.length == 0 || (video.likes.length > 0  && video.likes[0].category == 2)){
            const voted = video.likes.length > 0 ? true : false;
            dispatch(likeVideo({id: video.id, category: 1, userId: user.uid, name: user.name, voted}))
        }
        
    }

    const onDisLike = () => {
        if(video.likes.length == 0 || (video.likes.length > 0  && video.likes[0].category == 1)){
            const voted = video.likes.length > 0 ? true : false;
            dispatch(likeVideo({id: video.id, category: 2, userId: user.uid, name: user.name, voted}))
        }
    }

    return (
        <Card hoverable style={{width: '100%', height: '300px'}}>
            <Row gutter={16}>
                <Col span={10}>
                    <Iframe url={video.url} />       
                </Col>
                <Col span={14}>
                    <Row>
                        <Col span={24} flex="auto">
                            <b>{video.title}</b>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            share by: <u><i>{video.user_share.name}</i></u>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={1}>
                            <span onClick={onLike}>{video.like} <LikeOutlined style={{color: video.likes.length && video.likes[0].category === 1 ? "#08c" : "black"}} /></span>
                        </Col>
                        <Col span={1}>
                            <span onClick={onDisLike}>{video.dislike} <DislikeOutlined style={{color: video.likes.length && video.likes[0].category === 2 ? "#08c" : "black"}} /></span>
                        </Col>
                        <Col span={5}>
                            <span>{video.likes.length ? "Voted" : ""}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} flex="auto">
                            <p>Description:</p>
                            <div><p style={{width: '100%'}}>{video.description}</p></div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    )
}
