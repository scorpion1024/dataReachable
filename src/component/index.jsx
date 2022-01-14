/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import "antd/dist/antd.css";
import "../static/css/index.css";
import logoImg from "../static/img/Logo.png";
import { Avatar, Space, Input, Select, Button, Modal } from "antd";
import {
  QuestionCircleFilled,
  PlusOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Component } from "react";
import MyMenu from "./menu";
import { connect } from "react-redux";
const { Option } = Select;
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: this.props.userList,
      newName: "",
      newEmail: "",
      newPermission: "",
      showElem: "block",
      isPC: true,
    };
  }
  componentDidMount() {
    this.setState({
      isPC: this.IsPC(),
    });
  }
  IsPC = () => {
    const userAgentInfo = navigator.userAgent;
    const Agents = [
      "Android",
      "iPhone",
      "SymbianOS",
      "Windows Phone",
      "iPad",
      "iPod",
    ];
    const flag = Agents.filter((item) => {
      return userAgentInfo.includes(item);
    });
    return !flag.length;
  };
  itemChange = (event) => {
    const value = event.target ? event.target.value : event;
    if (event.target) {
      if (event.target.name === "name") {
        this.setState({
          newName: value,
        });
      }
      if (event.target.name === "email") {
        this.setState({
          newEmail: value,
        });
      }
    } else {
      this.setState({
        newPermission: value,
      });
    }
  };
  submitMemberAdd = () => {
    const { newName, newEmail, newPermission } = this.state;
    if (
      this.state.userList.map((item) => item.name).includes(newName) &&
      this.state.userList.map((item) => item.email).includes(newEmail)
    ) {
      Modal.warning({
        content: `This input name '${newName}' and email '${newEmail}' has already exist `,
      });
      return false;
    }
    if (newName && newEmail) {
      this.state.userList.pop();
      this.state.userList.push({
        name: newName,
        email: newEmail,
        permissions: newPermission,
      });
      this.props.setList(this.state.userList);
      this.setState({
        userList: this.state.userList,
        showElem: "block",
      });
    } else {
      Modal.warning({
        content: "Please input something",
      });
    }
  };
  addMember = () => {
    const name = (
      <Input
        size="small"
        style={{ width: "80%" }}
        placeholder="input name"
        name="name"
        autoComplete="off"
        onChange={this.itemChange}
      />
    );
    const email = (
      <Input
        size="small"
        style={{ width: "80%" }}
        placeholder="input email"
        name="email"
        autoComplete="off"
        onChange={this.itemChange}
      />
    );
    const permission = (
      <>
        <Select
          defaultValue=""
          style={{ width: 80 }}
          bordered={false}
          onChange={this.itemChange}
        >
          <Option value="">can edit</Option>
          <Option value="owner">owner</Option>
          <Option value="deny">deny</Option>
          <Option value="custom">custom</Option>
        </Select>
        <Button type="primary" size="small" onClick={this.submitMemberAdd}>
          Submit
        </Button>
      </>
    );
    this.state.userList.push({
      name: name,
      email: email,
      permissions: permission,
    });
    this.setState({
      userList: this.state.userList,
      showElem: "none",
    });
  };
  getHeader = () => {
    if (this.state.isPC) {
      return (
        <header className="header">
          <span className="header-text">dataReachable</span>
          <Space className="header-right">
            <Avatar style={{ backgroundColor: "#006d75" }}>YL</Avatar>
            <a href="#" className="header-link-text">
              Go to Dashboard
            </a>
            <Avatar shape="square" size="small">
              A
            </Avatar>
            <Avatar shape="square" size="small">
              文
            </Avatar>
          </Space>
        </header>
      );
    } else {
      return (
        <header className="header">
          <span className="header-text">dataReachable</span>
          <Space className="header-right">
            <Avatar style={{ backgroundColor: "#006d75" }}>YL</Avatar>
            <UnorderedListOutlined twoToneColor="#fa541c" />
          </Space>
        </header>
      );
    }
  };
  getLogo = () => {
    if (this.state.isPC) {
      return (
        <div className="content-line">
          <Space className="content-flex-row">
            <div className="content-flex-title">Status</div>
            <div className="content-flex-text">
              Private
              <QuestionCircleFilled />
            </div>
          </Space>
          <Space
            className="content-flex-row"
            style={{ marginRight: "100px", alignItems: "center" }}
          >
            <img
              src={logoImg}
              style={{
                width: "60px",
                height: "60px",
              }}
            />
            <a href="#" className="content-link-text">
              Change Logo
            </a>
          </Space>
        </div>
      );
    } else {
      return (
        <>
          <div className="content-line content-mobile-logo">
            <Space className="content-flex-row content-flex-mobile">
              <img
                src={logoImg}
                style={{
                  width: "80px",
                  height: "80px",
                }}
              />
              <a href="#" className="content-link-text">
                Change Logo
              </a>
            </Space>
          </div>
          <div className="content-line">
            <Space className="content-flex-row">
              <div className="content-flex-title">Status</div>
              <div className="content-flex-text">
                Private
                <QuestionCircleFilled />
              </div>
            </Space>
          </div>
        </>
      );
    }
  };
  render() {
    const { userList } = this.state;
    return (
      <div className="container">
        {this.getHeader()}
        <div className="main">
          {this.state.isPC && <MyMenu />}
          <div className="content">
            <div className="content-line">
              <Input
                className="content-input"
                placeholder="Ekas Pty Ltd"
                size="large"
              />
            </div>
            {this.getLogo()}
            <div className="content-line">
              <Space className="content-flex-row">
                <div className="content-flex-title">Members</div>
              </Space>
            </div>
            <div className="content-table-line content-table-title">
              <div className="content-flex-table-item content-flex-table-title">
                Name
              </div>
              <div className="content-flex-table-item content-flex-table-title">
                Email
              </div>
              <div className="content-flex-table-item content-flex-table-title">
                Permissions
              </div>
            </div>
            {userList.map((user) => {
              return (
                <div
                  className="content-table-line"
                  key={user.email + "." + user.name}
                >
                  <div className="content-flex-table-item">{user.name}</div>
                  <div className="content-flex-table-item">{user.email}</div>
                  <div className="content-flex-table-item">
                    {user.permissions ? (
                      user.permissions
                    ) : (
                      <Select
                        defaultValue=""
                        bordered={false}
                        size="small"
                        style={{ width: 80 }}
                      >
                        <Option value="">can edit</Option>
                        <Option value="owner">owner</Option>
                        <Option value="deny">deny</Option>
                        <Option value="custom">custom</Option>
                      </Select>
                    )}
                  </div>
                </div>
              );
            })}
            <div
              className="content-table-line add-organization aside-link"
              onClick={this.addMember}
              style={{ display: this.state.showElem, width: "50%" }}
            >
              <Space size={20}>
                <PlusOutlined />
                <span className="aside-line-text add-organization">
                  Add member
                </span>
              </Space>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    userList: state.userList,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setList: (list) => dispatch({ type: "user", value: list }),
  };
}
export default index = connect(mapStateToProps, mapDispatchToProps)(index);
