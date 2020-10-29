import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchQuestion } from "./../api";
import { useParams, useHistory } from "react-router-dom";
import { Box, Image, Heading, Radio,RadioGroup, Spinner, Button } from "@chakra-ui/core";
const Frame = styled.div`
  height: 100vh;
`;
const ScreenDetail = (props) => {
  let { id } = useParams();

  let history = useHistory();
console.log(history)
  const [question, setQuestion] = useState(null);
  const [chosedChoice, setChosedChoice] = useState(null);

  useEffect(async () => {
    const { status, data } = await fetchQuestion(id);
    if (status == 200) {
      setQuestion(data);
    }
  }, []);

  const returnToList = () => {
    history.goBack()
  }

  const info = () => {
    return  <>
    <Box size="sm">
        <Image src={question.image_url} alt="Segun Adebayo" />
      </Box>
      <Button variantColor="green" onClick={returnToList}>
        Button
      </Button>
      <Heading fontSize="xl">{question.question}</Heading>
      <RadioGroup onChange={(e) => setChosedChoice(e.target.value)} value={chosedChoice}>
        {question.choices.map(({ choice, votes }, index) => (
          <Radio key={index} value={choice}>
            {choice} - {votes}
          </Radio>
        ))}
      </RadioGroup></>
  }

  return (
    <Frame>
      {
        question != null ? info() : <Spinner /> 
      }
      
    </Frame>
  );
};

export default ScreenDetail;
