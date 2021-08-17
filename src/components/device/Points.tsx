import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import MyText from "../common/MyText";
import styled from "styled-components/native";
import { rpWidth } from "~/styles";

const Container = styled.View`
  width: ${rpWidth(25)}px;
`;

const arr = [".", "..", "..."];

const Points = () => {
  const [index, setIndex] = useState(0);
  const [isIncreasing, setIsIncreasing] = useState(true);

  useEffect(() => {
    if (index === 2) setIsIncreasing(false);
    if (index === 0) setIsIncreasing(true);
    const timeout = setTimeout(() => {
      if (isIncreasing) {
        setIndex(prev => prev + 1);
      } else {
        setIndex(prev => prev - 1);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [index, isIncreasing]);

  return (
    <Container>
      <MyText fontSize={24} fontWeight="medium">
        {arr[index]}
      </MyText>
    </Container>
  );
};

export default React.memo(Points);
