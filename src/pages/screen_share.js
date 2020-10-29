import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { share } from "./../api";
import {
  Input,
  Flex,
  Textarea,
  Stack,
  Button,
  useToast,
} from "@chakra-ui/core";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

const Frame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ScreenShare = (props) => {
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [validation, setValidation] = useState(true);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const submitForm = async () => {
    if (!validation) {
      setValidation(true);
      setEmail("");
      setContent("");
      setLoading(true);

      const { status, data } = await share(email, content);

      if (status == 200 && data) {
        toast({
          title: "Content send.",
          description: "Content send to " + email,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangeTextarea = (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    if (history.location.search != "") {
      const query = queryString.parse(history.location.search);
      if ("content" in query) {
        setContent(query.content);
      }
    }
  });

  useEffect(() => {
    if (validateEmail(email) && content != "") {
      setValidation(false);
    } else {
      setValidation(true);
    }
  }, [email, content]);

  return (
    <Frame>
      <Stack spacing={8} p={4} width="50%">
        <Flex size="50%">
          <Input placeholder="Email" onChange={onChangeEmail} value={email} />
        </Flex>
        <Flex size="50%">
          <Textarea
            value={content}
            placeholder="Here is a sample placeholder"
            onChange={onChangeTextarea}
          />
        </Flex>

        <Flex size="50%">
          <Button
            variantColor="green"
            onClick={submitForm}
            disabled={validation}
          >
            Submit
          </Button>
        </Flex>
      </Stack>
    </Frame>
  );
};

export default ScreenShare;
