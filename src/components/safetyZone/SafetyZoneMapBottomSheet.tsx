import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import Button from "~/components/common/Button";
import Input from "~/components/common/Input";
import useBottomSheet from "~/hooks/useBottomSheet";
import { useAppSelector } from "~/store";
import { safetyZoneActions } from "~/store/safetyZone";
import { rpWidth } from "~/styles";
import ScrollPicker from "../common/ScrollPicker";

const RowContainer = styled.View`
  flex-direction: row;
  padding: 0px ${rpWidth(38)}px;
  margin-bottom: ${rpWidth(13)}px;
`;

const InputContainer = styled.View`
  width: 43%;
`;

const data = ["10m", "20m", "30m", "50m", "100m"];

const SafetyZoneMapBottomSheet = ({ snapPoints }: { snapPoints: number[] }) => {
  const { BottomSheetComponent } = useBottomSheet();

  const name = useAppSelector(state => state.safetyZone.name);
  const radius = useAppSelector(state => state.safetyZone.radius);
  const isSubmitting = useAppSelector(state => state.safetyZone.isSubmitting);
  const dispatch = useDispatch();

  const handleFinish = () => {
    dispatch(safetyZoneActions.setIsSubmitting(true));
  };

  return (
    <BottomSheetComponent
      enableContentPanningGesture={false}
      enableHandlePanningGesture={false}
      enableFlashScrollableIndicatorOnExpand={false}
      enableOverDrag={false}
      animateOnMount
      snapPoints={snapPoints}
      index={0}>
      <RowContainer>
        <InputContainer style={{ marginRight: "13%" }}>
          <Input
            value={name}
            placeholder="안심존 이름"
            onChangeText={text => dispatch(safetyZoneActions.setName(text))}
          />
        </InputContainer>
        <InputContainer style={{ alignItems: "center" }}>
          <ScrollPicker
            data={data}
            onChange={index =>
              dispatch(safetyZoneActions.setRadius(data[index]))
            }
            width={rpWidth(88)}
            height={rpWidth(39)}
            selectedIndex={data.findIndex(item => item === radius)}
          />
        </InputContainer>
      </RowContainer>
      <Button
        /* disabled={!name || !radius} */ isLoading={isSubmitting}
        onPress={handleFinish}>
        다음
      </Button>
    </BottomSheetComponent>
  );
};

export default SafetyZoneMapBottomSheet;
