import React, { useContext, useEffect } from "react";
import styled from "styled-components/native";
import Button from "~/components/common/Button";
import MyText from "~/components/common/MyText";
import palette from "~/styles/palette";
import Dog from "~/assets/svg/dog/dog-crying.svg";
import { View } from "react-native";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import { DeleteAccountSecondPageScreenNavigationProp } from "~/types/navigator";
import { useAppSelector } from "~/store";
import userApi from "~/api/user";
import { useDispatch } from "react-redux";
import { commonActions } from "~/store/common";

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const RowContainer = styled.View`
  flex-direction: row;
`;

const TextContainer = styled.View<{ rpWidth: RpWidth }>`
  padding: ${({ rpWidth }) => `0px ${rpWidth(32)}px`};
`;

const DeleteAccountSecondPage = ({
  navigation,
}: {
  navigation: DeleteAccountSecondPageScreenNavigationProp;
}) => {
  const { body } = useAppSelector(state => state.common.deleteAccount);
  const { rpWidth } = useContext(DimensionsContext);
  const [deleteAccount, { isLoading, isSuccess }] =
    userApi.useDeleteAccountMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(commonActions.setDeleteAccount(null));
      navigation.replace("UserRequestSuccess", {
        text: "정상적으로\n탈퇴되었습니다.",
      });
    }
  }, [isSuccess]);

  return (
    <Container>
      <TextContainer rpWidth={rpWidth}>
        <RowContainer style={{ marginBottom: rpWidth(25) }}>
          <MyText
            color={palette.blue_7b}
            style={{ marginHorizontal: rpWidth(12) }}>
            •
          </MyText>
          <MyText>
            2개월간 동일한 휴대폰 번호나 이메일{"\n"}주소로 재가입이
            불가능합니다.
          </MyText>
        </RowContainer>
        <RowContainer>
          <MyText
            color={palette.blue_7b}
            style={{ marginHorizontal: rpWidth(12) }}>
            •
          </MyText>
          <MyText>
            그동안의 활동 내역과 정보가 폐기되며,{"\n"}복구가 불가능합니다.
          </MyText>
        </RowContainer>
      </TextContainer>
      <View>
        <Dog
          width={rpWidth(133)}
          height={rpWidth(129)}
          style={{
            marginBottom: rpWidth(50),
            alignSelf: "flex-end",
            marginRight: rpWidth(50),
          }}
        />
        <Button
          isLoading={isLoading}
          useBottomInset
          useCommonMarginBottom
          onPress={() => {
            if (isLoading) return;
            const parsed = JSON.stringify(body).replace(/[[[\]"]/g, "");
            deleteAccount(parsed);
          }}>
          확인 및 탈퇴
        </Button>
      </View>
    </Container>
  );
};

export default DeleteAccountSecondPage;
