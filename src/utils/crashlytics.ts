import crashlytics from "@react-native-firebase/crashlytics";

const log = (str: string) => crashlytics().log(str);
const setUserId = (id: string) => crashlytics().setUserId(id);
const recordError = (err: Error) => crashlytics().recordError(err);

export default { log, setUserId, recordError };
