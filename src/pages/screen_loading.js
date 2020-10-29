import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchStatus } from "./../api";
import { useHistory } from "react-router-dom";

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
  const [loading, setLoading] = useState(true);
  let history = useHistory();

  const checkStatus = async () => {
    const { data, status } = await fetchStatus();
    if (status === 200 && data.status === "OK") {
      setLoading(false);
      goToList()
    } else {
      setLoading(true);
    }
  }

  function goToList(id) {
    history.push('/list');
  }

  useEffect(() => {
    checkStatus();
  },[]);

  return <Frame>{loading && <Loader />}</Frame>;
};

export default ScreenLoader;
