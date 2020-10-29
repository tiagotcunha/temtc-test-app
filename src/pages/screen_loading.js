import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchStatus } from "./../api";
import { useHistory } from "react-router-dom";
import { Button } from "@chakra-ui/core";
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

const ScreenLoader = () => {
  const [loading, setLoading] = useState(true);
  const [serviceNotAvaible, setserviceNotAvaible] = useState(false);
  let history = useHistory();

  const checkStatus = async () => {
    setserviceNotAvaible(false);
    setLoading(true);

    const { data, status } = await fetchStatus();
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
