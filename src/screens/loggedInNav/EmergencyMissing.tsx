import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import Button from "~/components/common/Button";
import usePagingFlatList from "~/hooks/usePagingFlatList";
import { commonActions } from "~/store/common";

const EmergencyMissing = () => {
  const { PagingFlatList } = usePagingFlatList();
  const dispatch = useDispatch();

  return <></>;
};

export default EmergencyMissing;
