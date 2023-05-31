import { Button, Modal, Form, Input } from 'antd';
import { useAppSelector, useAppDispatch } from '../../hook';
import { openPopupCreate, createVideo } from './slice';

export const ModalCreate = () => {
    const dispatch = useAppDispatch();
    const openModal = useAppSelector((state) => state.video.popupCreate);

    const onFinish = (values: any) => {
        dispatch(createVideo(values));
    };

    const handleCancel = () => {
        dispatch(openPopupCreate(false));
    };

    return (
        <>
        <Modal title="Share Video" open={openModal} footer={null} onCancel={handleCancel} style={{textAlign: 'center'}}>
            <Form
                id="shareVideoForm"
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input title video share!'} ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Url"
                    name="url"
                    rules={[{ required: true, message: 'Please input url video share!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
        </>
    );
};
