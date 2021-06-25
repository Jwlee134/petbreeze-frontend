export const years = Array.from(Array(20), (_, i) => 2021 - i).map(year =>
  String(year),
);

export const months = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

export const days = ["일", "월", "화", "수", "목", "금", "토"];

export const species = ["개", "고양이", "기타", "직접 입력"];

export const dogBreeds = ["개a", "개b", "개c", "개d", "직접 입력"];

export const catBreeds = [
  "고양이a",
  "고양이b",
  "고양이c",
  "고양이d",
  "직접 입력",
];

export const gender = ["남", "여", "모름"];

export const safetyZoneData = [
  { label: "100m", value: 100 },
  { label: "200m", value: 200 },
  { label: "300m", value: 300 },
  { label: "500m", value: 500 },
  { label: "1km", value: 1000 },
];
