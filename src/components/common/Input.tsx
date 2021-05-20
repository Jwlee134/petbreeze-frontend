import React from "react";
import { TextInputProps } from "react-native";
import styled from "styled-components/native";

interface IInput extends TextInputProps {}

const Container = styled.View`
  width: 100%;
  height: 46px;
  padding: 0px 11px;
  margin-top: 9px;
`;

const TextInput = styled.TextInput`
  font-size: 16px;
`;

const Input = ({ ...props }: IInput) => (
  <Container>
    <TextInput {...props} />
  </Container>
);

export default Input;
