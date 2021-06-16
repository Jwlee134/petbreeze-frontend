import React from "react";
import styled from "styled-components/native";
import { ISafetyZone } from "~/store/storage";
import palette from "~/styles/palette";

const Container = styled.View`
  width: 100%;
  height: 68px;
  border-width: 1px;
  border-color: ${palette.gray_e5};
  background-color: rgba(242, 242, 242, 0.8);
  border-radius: 9px;
  margin-bottom: 17px;
  padding: 9px 15px;
  flex-direction: row;
  justify-content: space-between;
`;

const RowContainer = styled.View`
  flex-direction: row;
`;

const Name = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: black;
`;

const Distance = styled.Text`
  font-size: 16px;
  color: gray;
  margin-left: 8px;
  margin-top: 1.5px;
`;

const EditButton = styled.TouchableOpacity``;

const Edit = styled.Text`
  font-size: 18px;
  text-decoration: underline;
`;

const SafetyZone = ({
  item,
  handleEdit,
}: {
  item: ISafetyZone;
  handleEdit: () => void;
}) => (
  <Container>
    <RowContainer>
      <Name>{item.name}</Name>
      <Distance>{item.distanceLabel}</Distance>
    </RowContainer>
    <EditButton onPress={handleEdit} activeOpacity={0.7}>
      <Edit>편집</Edit>
    </EditButton>
  </Container>
);

export default SafetyZone;
