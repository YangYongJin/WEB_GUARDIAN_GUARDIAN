import React, { useState, useCallback } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  DesktopOutlined,
  PieChartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import Log from "./Log";
const { Header, Content, Footer, Sider } = Layout;

function LogBar() {
  const [RightBar, SetRightBar] = useState<boolean>(false);
  const onRightBar = (collapsed: boolean) => {
    SetRightBar(collapsed);
  };
  return (
    <Sider
      style={{ background: "white" }}
      reverseArrow
      collapsible
      width={300}
      collapsedWidth={0}
      collapsed={RightBar}
      onCollapse={onRightBar}
    >
      <Log />
    </Sider>
  );
}
export default function MainLayout({
  main,
  setting,
  dashboard,
}: {
  main: React.FunctionComponent;
  setting: React.FunctionComponent;
  dashboard: React.FunctionComponent;
}) {
  const [LeftBar, SetLeftBar] = useState<boolean>(false);
  
  const onLeftBar = (collapsed: boolean) => {
    SetLeftBar(collapsed);
  };
 
  const defaultSelecedKey = useCallback(() => {
    const pathname = window.location.pathname;
    if (pathname === "/") return "1";
    else if (pathname === "/setting") return "2";
    else if (pathname === "/dashboard") return "3";
    return "0";
  }, []);
  return (
    <Router>
      <Layout
        style={{ minHeight: "100vh", overflowX: "hidden", overflowY: "hidden" }}
      >
        <Sider collapsible collapsed={LeftBar} onCollapse={onLeftBar}>
          <div className="logo" />
          <Menu
            theme="dark"
            defaultSelectedKeys={[defaultSelecedKey()]}
            mode="inline"
          >
            <Menu.Item key="1" icon={<DesktopOutlined />}>
              CCTV 모니터링
              <Link to="/" />
            </Menu.Item>
            <Menu.Item key="2" icon={<SettingOutlined />}>
              설정
              <Link to="/setting" />
            </Menu.Item>
            <Menu.Item key="3" icon={<PieChartOutlined />}>
              통계
              <Link to="/dashboard" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <Route exact path="/" component={main} />
              <Route path="/setting" component={setting} />
              <Route path="/dashboard" component={dashboard} />
            </div>
          </Content>
          <Footer style={{ textAlign: "center", fontWeight: "bold" }}>
            GUARDIAN - CCTV 감지체계
          </Footer>
        </Layout>
        <Route exact path="/" component={LogBar} />
      </Layout>
    </Router>
  );
}
