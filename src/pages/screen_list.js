import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchList } from "./../api";
import {
  Stack,
  Heading,
  Box,
  Text,
  Spinner,
  Input,
  Image,
  Button,
} from "@chakra-ui/core";
import { useHistory } from "react-router-dom";

const Frame = styled.div`
  height: 100vh;
`;

function Feature({ title, desc, image, onClick, ...rest }) {
  return (
    <Box p={5} shadow="md" borderWidth="1px" flex="1" rounded="md" {...rest}>
      <Box size="sm">
        <Image src={image} alt="Segun Adebayo" />
      </Box>
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{desc}</Text>
      <Button variantColor="green" onClick={onClick}>
        Button
      </Button>
    </Box>
  );
}

function List({ questions }) {
  let history = useHistory();

  function handleClick(id) {
    history.push("/question/" + id);
  }

  return (
    <Stack isInline spacing={8} align="center">
      {questions.map((item) => (
        <Feature
          key={item.id}
          title={item.question}
          desc={item.published_at}
          image={item.image_url}
          onClick={(e) => handleClick(item.id)}
        />
      ))}
    </Stack>
  );
}

const ScreenList = (props) => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState(null);

  const fetchData = async () => {
    const { data, status } = await fetchList();
    if (status === 200) {
      console.log("kkkd", data);
      setQuestions(data);
    }

    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);
  return (
    <div>
      <Input placeholder="Basic usage" />
      {loading && <Spinner />}
      {questions != null ? (
        <List questions={questions}></List>
      ) : (
        <div>Empty</div>
      )}
    </div>
  );
};

export default ScreenList;
