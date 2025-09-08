import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,

} from "@ant-design/icons";
import { NavLink, Outlet } from "react-router-dom";
import { Layout, Menu, Button, theme } from "antd";
import { useEffect } from "react";
import { getLocalStorage } from "../../utils/util";
import { ToastContainer, toast } from "react-toastify";
const { Header, Sider, Content } = Layout;



export const NotifyContext = React.createContext(null);

const AdminTemplate = () => {
  useEffect(() => {
    // thực hiện lấy dữ liệu từ local lên để kiểm tra
    // Hello Thành
    const user = getLocalStorage("userMovie0967146");
    // console.log(user);
    if (!user) {
      window.location.href = "https://google.com";
    }
    if (user?.maLoaiNguoiDung !== "QuanTri") {
      window.location.href = "https://google.com";
    }
  }, []);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // thông báo
  const renderNotify = (notify) => {
    return toast(notify);
  };


  // Quản lí người dùng, quản lí phim, quản lí lịch chiếu

  return (
    <NotifyContext.Provider value={renderNotify}>
      <Layout className="min-h-screen">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <VideoCameraOutlined />,
                label: <NavLink to="/admin/quan-li-phim">Quản lí phim</NavLink>,
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: <NavLink to="/admin/them-phim">Tạo phim</NavLink>,
              },
              {
                key: "3",
                // icon: <i class="fa-regular fa-user w-2 mr-2"></i>,
                icon: <UserOutlined />,
                label: <NavLink to="/admin/quan-li-nguoi-dung">Quản lý người dùng</NavLink>,
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      <ToastContainer autoClose={2000} theme="dark" />
    </NotifyContext.Provider>



  );
};

export default AdminTemplate;
