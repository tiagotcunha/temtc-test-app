import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { fetchStatus } from "./../api";
import { useHistory } from "react-router-dom";
import { Button } from "@chakra-ui/core";

const loaderAnimation = keyframes`
  0%   {transform: scale(.8);}
  100% {transform: scale(1.5);}
`;

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
  animation-name: ${loaderAnimation};
  animation-duration: 1s;
  animation-iteration-count: infinite;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const Frame = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const ScreenLoader = () => {
  const [loading, setLoading] = useState(true);
  const [serviceNotAvaible, setserviceNotAvaible] = useState(false);
  let history = useHistory();

  const checkStatus = async () => {
    setserviceNotAvaible(false);
    setLoading(true);

    const request = await fetchStatus();

    const { data, status, error } = request;
    if (status === 200 && data.status === "OK") {
      setLoading(false);
      goToList();
    } else {
      setserviceNotAvaible(true);
    }
    setLoading(false);
  };

  function goToList(id) {
    history.push("/list");
  }

  function reConnect() {
    checkStatus();
  }

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <Frame>
      {loading && <Loader />}
      {serviceNotAvaible && (
        <Button variantColor="green" onClick={reConnect}>
          reconnect
        </Button>
      )}
    </Frame>
  );
};

export default ScreenLoader;
