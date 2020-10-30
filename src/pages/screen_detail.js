import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchQuestion, updateQuestion } from "./../api";
import { useParams, useHistory } from "react-router-dom";
import {
  Box,
  Image,
  Heading,
  Radio,
  RadioGroup,
  Spinner,
  Button,
  Stack,
  Flex,
} from "@chakra-ui/core";
const Frame = styled.div`
  display: flex;
  justify-content: center;
`;
const ScreenDetail = (props) => {
  let { id } = useParams();

  let history = useHistory();
  const [question, setQuestion] = useState(null);
  const [chosedChoice, setChosedChoice] = useState(null);

  useEffect(async () => {
    const { status, data } = await fetchQuestion(id);
    if (status === 200) {
      setQuestion(data);
    }
  }, []);

  useEffect(async () => {
    if (chosedChoice != null) {
      console.log("before", question.choices[chosedChoice]);
      question.choices[chosedChoice].votes =
        +question.choices[chosedChoice].votes + 1;
      console.log("after", question.choices[chosedChoice]);

      const { status, data } = await updateQuestion(id, question);
      if (status === 200) {
        setQuestion(data);
      }
    }
  }, chosedChoice);

  const returnToList = () => {
    history.goBack();
  };

  const onChangeChoice = (e) => {
    setChosedChoice(e.target.value);
  };

  const shareButton = (e) => {
    history.push(`/share?content= + ${question.question} \n ${window.location.href} `);
    setChosedChoice(e.target.value);
  };

  const info = () => {
    return (
      <>
        <Stack spacing={8} p={4} >
          <Flex >
            <Button variantColor="green" onClick={returnToList}>
              Back to list
            </Button>
            <Button variantColor="blue" onClick={shareButton} ml={2}>
              share
            </Button>
          </Flex>

          <Image src={question.image_url} alt="Segun Adebayo" />

          <Heading fontSize="xl">{question.question}</Heading>
          <RadioGroup onChange={onChangeChoice} value={chosedChoice} mb={4}>
            {question.choices.map(({ choice, votes }, index) => (
              <Radio key={index} value={index} name="radio">
                {choice} - {votes}
              </Radio>
            ))}
          </RadioGroup>
        </Stack>
      </>
    );
  };

  return <Frame>{question != null ? info() : <Spinner mt={5} />}</Frame>;
};

export default ScreenDetail;
