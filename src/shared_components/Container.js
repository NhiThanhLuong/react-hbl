import React from "react";

const Container = ({ children, style = {}, ...props }) => {
  return (
    <div {...props} style={{ padding: "0 16px", height: "100%", ...style }}>
      {children}
    </div>
  );
};

export default Container;
