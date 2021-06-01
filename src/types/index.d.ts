export type AnimalInfoClickedField =
  | "동물 선택"
  | "품종 선택"
  | "출생 연도"
  | "성별"
  | "잃어버린 시간"
  | "";

export type HandleRememberIndexArg =
  | "species"
  | "breed"
  | "gender"
  | "birthYear";

export type BigCategory =
  | "서울특별시"
  | "부산광역시"
  | "인천광역시"
  | "대구광역시"
  | "광주광역시"
  | "대전광역시"
  | "울산광역시"
  | "세종특별자치시"
  | "경기도"
  | "강원도"
  | "충청북도"
  | "충청남도"
  | "경상북도"
  | "경상남도"
  | "전라북도"
  | "전라남도"
  | "제주특별자치도";

export type SubCategoryList = ({ [key: string]: string[] } | string)[];
