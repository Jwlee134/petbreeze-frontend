export type AnimalInfoClickedField =
  | "동물 선택"
  | "품종 선택"
  | "출생 연도"
  | "성별"
  | "잃어버린 시간"
  | "발견한 시간"
  | "날짜 선택"
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

export type ModalType = "share" | "manage" | "saved";
export type ModalHeader =
  | "공유하기"
  | "게시물 저장"
  | "게시물 관리"
  | "전단지 이미지로 저장"
  | "";

type StatusValue =
  | "before"
  | "searching"
  | "connected"
  | "connectFailed"
  | "downloading"
  | "downloadFailed"
  | "installing"
  | "completed"
  | "profile"
  | "notifFailed";

export interface Status {
  value: StatusValue;
  text: string;
}
