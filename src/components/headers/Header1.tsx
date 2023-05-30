import React from "react";
import { PageHeader, Menu, Dropdown, Button, Tag, Typography, Row } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./styles.css";

const { Paragraph } = Typography;

const routes = [
    {
        path: "index",
        breadcrumbName: "First-level Menu"
    },
    {
        path: "first",
        breadcrumbName: "Second-level Menu"
    },
    {
        path: "second",
        breadcrumbName: "Third-level Menu"
    }
];

const menu = (
    <Menu>
        <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
            1st menu item
        </a>
        </Menu.Item>
        <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
            2nd menu item
        </a>
        </Menu.Item>
        <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
            3rd menu item
        </a>
        </Menu.Item>
    </Menu>
);

const DropdownMenu = () => (
  <Dropdown key="more" overlay={menu}>
    <Button
      style={{
        border: "none",
        padding: 0
      }}
    >
      <EllipsisOutlined
        style={{
          fontSize: 20,
          verticalAlign: "top"
        }}
      />
    </Button>
  </Dropdown>
);

export const App = () => (
  <PageHeader
    title="IntelliGems"
    className="site-page-header"
    subTitle="This is a subtitle"
    tags={<Tag color="blue">Running</Tag>}
    extra={[
      <Button key="3">Operation</Button>,
      <Button key="2">Operation</Button>,
      <Button key="1" type="primary">
        Primary
      </Button>,
      <DropdownMenu key="more" />
    ]}
    avatar={{
      src: "https://avatars0.githubusercontent.com/u/1299233?s=400&v=4"
    }}
    breadcrumb={{ routes }}
  ></PageHeader>
);
