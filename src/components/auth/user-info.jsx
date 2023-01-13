import { useNavigate } from "react-router-dom";
import { Dropdown, Button, Menu } from "antd";
import { FaUser, FaLock } from "react-icons/fa";

import { useCallback } from "react";
import { storage } from "_constants";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "ultis/api";
import { toast } from "react-toastify";

const UserInfo = () => {
  const navigate = useNavigate();

  const { data } = useQuery(["info"], getUserProfile, {
    select: useCallback((data) => data.data, []),
  });

  const onLogout = () => {
    localStorage.removeItem(storage.access_token);
    localStorage.removeItem(storage.refresh_token);
    toast.info("You've been logged out");
    navigate("/login", { replace: true });
  };

  // useEffect(() => {
  //   if (!token) navigate("/login", { replace: true });
  // }, [token]);

  const menu = (
    <Menu
      items={[
        {
          label: "User Information",
          key: 1,
          icon: <FaUser />,
        },
        {
          label: (
            <span aria-hidden="true" role="presentation">
              Log Out
            </span>
          ),
          key: 2,
          icon: <FaLock />,
        },
      ]}
      onClick={({ key }) => {
        if (key === "2") onLogout();
      }}
    />
  );
  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Button
        type="text"
        style={{
          height: "100%",
          padding: 0,
        }}
      >
        {/* <Row align="middle" gutter={8}>
          <Col>
            <p>{full_name}</p>
            <p>
              {user_name} - {role?.name}
            </p>
          </Col>
          <Col>
            <img src={imgPath(avatar)} width={32} alt="" />
          </Col>
        </Row> */}
        <p className="text-lg">{data?.fullname}</p>
      </Button>
    </Dropdown>
  );
};
UserInfo.propTypes = {};

export default UserInfo;
