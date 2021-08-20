import React from "react";
import { useState } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import Input from "~/components/common/Input";
import { rpWidth } from "~/styles";
import {
  UpdateProfileRouteProp,
  UpdateProfileScreenNavigationProp,
} from "~/types/navigator";

const AvatarButton = styled.TouchableOpacity`
  width: ${rpWidth(108)}px;
  height: ${rpWidth(108)}px;
  border-radius: ${rpWidth(54)}px;
  overflow: hidden;
  align-self: center;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

const UpdateProfile = ({
  navigation,
  route,
}: {
  navigation: UpdateProfileScreenNavigationProp;
  route: UpdateProfileRouteProp;
}) => {
  const device = route.params.data;
  const [name, setName] = useState(device.name);
  const [birthYear, setBirthYear] = useState(1997);
  const [birtyMonth, setBirthMonth] = useState(11);
  const [birthDay, setBirthDay] = useState(19);
  const [gender, setGender] = useState(device.gender);
  const [breed, setBreed] = useState(device.breed);
  const [weight, setWeight] = useState(device.weight);
  const [phoneNumber, setPhoneNumber] = useState(device.phoneNumber);
  const [etc, setEtc] = useState(device.etc);

  const openGallery = () => {};

  return (
    <ScrollView
      contentContainerStyle={{
        marginTop: rpWidth(34),
      }}>
      <AvatarButton>
        <Image source={require("~/assets/image/test.jpg")} />
      </AvatarButton>
      <Input />
    </ScrollView>
  );
};

export default UpdateProfile;
