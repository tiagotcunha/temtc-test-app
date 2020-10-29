import React from "react";
import styled from "styled-components";
const Loader = styled.div`
  background: red;
  border: 2px solid lighten($base-color, 75%);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  -webkit-animation: spin 1s linear infinite; /* Safari */
  animation: spin 1s linear infinite;
  margin: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const Frame = styled.div`
  height: 100vh;
`;
const ScreenLoader = (props) => {
  return (
    <Frame>
      <Loader>
      </Loader>
    </Frame>
  );
};

export default ScreenLoader;
