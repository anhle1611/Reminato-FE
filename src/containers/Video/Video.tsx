import { Card, Col, Row } from 'antd';
import {
    LikeOutlined,
    DislikeOutlined
} from '@ant-design/icons';

import { Video } from './type';
import { Iframe } from '../../components/Iframe';

export function Video({ video }: {video: Video}) {

    return (
        <Card hoverable>
            <Row gutter={16}>
                <Col span={10}>
                    <Iframe url={video.url} />       
                </Col>
                <Col span={14}>
                    <Row>
                        <Col span={24}>
                            <b>{video.title}</b>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <p>{video.user_share.name}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={3}>
                            <span>{video.like} <LikeOutlined /></span>
                        </Col>
                        <Col span={3}>
                            <span>{video.dislike} <DislikeOutlined /></span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <p>Description:</p>
                            <p>{video.description}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    )
}
