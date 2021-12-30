import crashlytics from "@react-native-firebase/crashlytics";

const log = (str: string) => crashlytics().log(str);
const setUserId = (id: string) => crashlytics().setUserId(id);

export default { log, setUserId };
