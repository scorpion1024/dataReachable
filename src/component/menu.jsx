import logoImg from "../static/img/Logo.png";
import { Space, Input, Button, Modal, Avatar } from "antd";
import { SearchOutlined, TabletFilled, PlusOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";
let MyMenu = (props) => {
  let initOrg = props.organizationList;
  const [organizationList, setList] = useState(initOrg);
  const [newName, setNewName] = useState("");
  const [showElem, setShowElem] = useState("block");
  const newOrgName = useCallback((event) => {
    const value = event.target.value;
    setNewName(value);
  }, []);
  const dataRef = useRef();
  useEffect(() => {
    dataRef.current = newName;
  }, [newName]);
  const submitAdd = () => {
    const newName = dataRef.current;
    if (organizationList.map((item) => item.name).includes(newName)) {
      Modal.warning({
        content: `This input name '${newName}' has already exist `,
      });
      return false;
    }

    if (newName) {
      setList((preOrg) => {
        preOrg.pop();
        preOrg.push({ name: newName });
        return preOrg;
      });
      setShowElem(() => "block");
    } else {
      Modal.warning({
        content: "Please input something",
      });
    }
  };
  const addOrg = () => {
    const inputDom = (
      <Space direction="vertical" size={1}>
        <Input
          size="small"
          style={{ width: "160px" }}
          placeholder="input organization name"
          onChange={newOrgName}
        />
        <Button type="primary" size="small" onClick={submitAdd}>
          Submit
        </Button>
      </Space>
    );
    setList((preOrg) => {
      preOrg.push({ name: inputDom });
      return preOrg;
    });
    setShowElem(() => "none");
  };
  return (
    <div className="aside">
      <div className="aside-line">
        <Space size={22}>
          <Avatar style={{ backgroundColor: "#006d75" }}>M</Avatar>
          <span className="aside-line-text">Michael Liu</span>
        </Space>
      </div>
      <div className="aside-line">
        <Input placeholder="Search" prefix={<SearchOutlined />} size="small" />
      </div>
      <div
        className="aside-line"
        style={{
          borderBottom: "1px solid #ccc",
          margin: "0px 10px",
          padding: "0",
          paddingBottom: "10px",
          paddingLeft: "10px",
        }}
      >
        <Space size={20}>
          <TabletFilled />
          <span className="aside-line-text">dataReachable Pty Ltd</span>
        </Space>
      </div>
      {organizationList.map((org) => {
        return (
          <div className="aside-line aside-link" key={org.name}>
            <Space size={20}>
              <img src={logoImg} className="link-img" alt="" />
              <span className="aside-line-text">{org.name}</span>
            </Space>
          </div>
        );
      })}
      <div
        className="aside-line aside-link add-organization"
        onClick={addOrg}
        style={{ display: showElem }}
      >
        <Space size={20}>
          <PlusOutlined />
          <span className="aside-line-text add-organization">
            Create new organization
          </span>
        </Space>
      </div>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    organizationList: state.organizationList,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setOrgList: (list) => dispatch({ type: "organization", value: list }),
  };
}
export default MyMenu = connect(mapStateToProps, mapDispatchToProps)(MyMenu);
