import React, { useState, useContext } from "react";
import { ScrollView, View } from "react-native";
import AnimatedCircularProgress from "~/components/common/AnimatedCircularProgress";
import ListItem from "~/components/common/ListItem";
import MyText from "~/components/common/MyText";
import { useAppSelector } from "~/store";
import palette from "~/styles/palette";
import { WalkRecordScreenNavigationProp } from "~/types/navigator";
import styled from "styled-components/native";
import { DimensionsContext } from "~/context/DimensionsContext";

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const WalkRecord = ({
  navigation,
}: {
  navigation: WalkRecordScreenNavigationProp;
}) => {
  const { rpWidth, rpHeight } = useContext(DimensionsContext);
  const devices = useAppSelector(state => state.device);

  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: rpHeight(31),
        flexGrow: 1,
      }}
      showsVerticalScrollIndicator={false}>
      {devices.map(item => (
        <ListItem
          key={item.id}
          onPress={() =>
            navigation.navigate("WalkDetailMonth", {
              id: item.id,
            })
          }>
          <RowContainer>
            <AnimatedCircularProgress
              isBackgroundTransparent
              lineWidth={2}
              circleWidth={70}
              battery={item.battery}
            />
            <View
              style={{
                marginLeft: rpWidth(26),
              }}>
              <RowContainer>
                <MyText fontWeight="medium">{item.name}</MyText>
                <MyText
                  fontSize={12}
                  color={palette.blue_7b}
                  style={{ marginLeft: rpWidth(12) }}>
                  {item.battery}%
                </MyText>
              </RowContainer>
              <MyText
                style={{ marginTop: rpWidth(5) }}
                fontSize={12}
                color="rgba(0, 0, 0, 0.5)">
                마지막 산책
              </MyText>
            </View>
          </RowContainer>
        </ListItem>
      ))}
    </ScrollView>
  );
};

export default WalkRecord;
