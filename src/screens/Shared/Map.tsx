import React, { useLayoutEffect, useState } from "react";
import useMap from "~/hooks/useMap";
import styled from "styled-components/native";
import { useDispatch } from "react-redux";
import { animalInfoActions } from "~/store/form";
import useReverseGeocoding from "~/hooks/useReverseGeocoding";
import { MapScreenNavigationProp } from "~/types/navigator";
import palette from "~/styles/palette";

import Marker from "~/assets/svg/marker-red.svg";

const Container = styled.View`
  flex: 1;
`;

const Button = styled.TouchableOpacity`
  margin-right: 25px;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  color: ${palette.blue_6e};
`;

const MarkerContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -67px;
  margin-left: -20.5px;
`;

const Map = ({ navigation }: { navigation: MapScreenNavigationProp }) => {
  const { Map: MapView } = useMap();
  const dispatch = useDispatch();
  const { loading, setLoading, getAddress } = useReverseGeocoding();

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const handleLocation = async () => {
    try {
      setLoading(true);
      const address = await getAddress(latitude, longitude);
      if (address) {
        dispatch(animalInfoActions.setEventPlace(address));
      }
    } catch (error) {
    } finally {
      setLoading(false);
      navigation.goBack();
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={handleLocation}>
          <ButtonText>완료</ButtonText>
        </Button>
      ),
    });
  }, [latitude, longitude]);

  return (
    <Container>
      <MapView
        onRegionChangeComplete={({ latitude, longitude }) => {
          setLatitude(latitude);
          setLongitude(longitude);
        }}
      />
      <MarkerContainer>
        <Marker />
      </MarkerContainer>
    </Container>
  );
};

export default Map;
