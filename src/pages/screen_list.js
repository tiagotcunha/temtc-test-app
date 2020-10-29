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
  Flex,
  Button,
} from "@chakra-ui/core";
import { useHistory } from "react-router-dom";
import { debounce } from "throttle-debounce";
const Frame = styled.div`
  height: 100vh;
`;

function Feature({ title, desc, image, onClick, ...rest }) {
  return (
    <Box shadow="sm" borderWidth="1px" flex="1" rounded="md" {...rest}>
      <Box pt={15}>
        <Image src={image} alt="Segun Adebayo" />
      </Box>
      <Box pl={15} size="sm">
        <Heading fontSize="xl" pt={3}>{title}</Heading>
        <Text mt={4}>{desc}</Text>
        <Button variantColor="green" onClick={onClick} mt={2}>
          Button
        </Button>
      </Box>
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

const SearchWrap = styled.div`
  max-width: 300px;
  width: 100%;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  display: flex;
  align-items: center;
`;
const ListWrap = styled.div`
overflow:auto;
padding 15px;
`;
const ScreenList = (props) => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState(null);
  const [search, setSearch] = useState("");

  const fetchData = async (filter = "") => {
    const { data, status } = await fetchList({ filter: filter });
    if (status === 200) {
      setQuestions(data);
    }

    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchData(search);
  }, [search]);

  const onChangeSearch = debounce(500, async (e) => {
    setSearch(e.target.value);
  });

  return (
    <div>
      <SearchWrap>
        <Flex>
          <Input placeholder="Search" onChange={onChangeSearch} />
        </Flex>

        <Flex align="flex-end">{loading && <Spinner ml={3} />}</Flex>
      </SearchWrap>

      {questions != null ? (
        <ListWrap>
          <List questions={questions}></List>
        </ListWrap>
      ) : (
        <div>Empty</div>
      )}
    </div>
  );
};

export default ScreenList;
