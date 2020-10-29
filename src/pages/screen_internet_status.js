import React, { useEffect, useState } from "react";
import styled from "styled-components";
const Frame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
`;
const ScreenInternetStatus = (props) => {
  return (
    <Frame>
        No Internet Connection
    </Frame>
  );
};

export default ScreenInternetStatus;
