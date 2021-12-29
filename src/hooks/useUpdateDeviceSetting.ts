import { PatchCollection } from "@reduxjs/toolkit/dist/query/core/buildThunks";
import deviceApi, { AreaResponse } from "~/api/device";
import { GEOJSON_TYPE, SERVER_IMAGE_URI } from "~/constants";
import { store } from "~/store";
import imageHandler from "~/utils/imageHandler";

const useUpdateDeviceSetting = (deviceID: number) => {
  const [updateSetting, { isLoading: updatingDeviceSetting, isSuccess }] =
    deviceApi.useUpdateDeviceSettingMutation();
  const [updateSafetyZoneThumbnail, { isLoading: updatingThumbnail }] =
    deviceApi.useUpdateSafetyZoneThumbnailMutation();

  const isLoading = updatingDeviceSetting || updatingThumbnail;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const excludeThumbnail = ({ thumbnail, ...rest }: AreaResponse) => rest;

  const formatCoord = (area: Omit<AreaResponse, "thumbnail">) => ({
    ...area,
    coordinate: {
      type: GEOJSON_TYPE.POINT,
      coordinates: [
        parseFloat(area.coordinate.coordinates[0].toFixed(4)),
        parseFloat(area.coordinate.coordinates[1].toFixed(4)),
      ],
    },
  });

  const formatArea = (safety_areas: AreaResponse[]) =>
    safety_areas.map(area => formatCoord(excludeThumbnail(area)));

  const thumbnails = (safety_areas: AreaResponse[]) =>
    safety_areas
      .filter(
        area => !!area.thumbnail && !area.thumbnail.includes(SERVER_IMAGE_URI),
      )
      .map(area => ({ id: area.safety_area_number, data: area.thumbnail }));

  const sendRequest = async (
    safety_areas: AreaResponse[],
    collection_period = 300,
  ) => {
    let deviceSettingPutResult: PatchCollection | null = null;
    let deviceListPutResult: PatchCollection | null = null;
    try {
      deviceSettingPutResult = store.dispatch(
        deviceApi.util.updateQueryData("getDeviceSetting", deviceID, draft => {
          draft.collection_period = collection_period;
          draft.safety_areas = safety_areas;
        }),
      );
      deviceListPutResult = store.dispatch(
        deviceApi.util.updateQueryData("getDeviceList", undefined, draft => {
          draft[
            draft.findIndex(device => device.id === deviceID)
          ].collection_period = collection_period;
        }),
      );
      await updateSetting({
        deviceID,
        body: { safety_areas: formatArea(safety_areas), collection_period },
      }).unwrap();
    } catch {
      deviceSettingPutResult?.undo();
      deviceListPutResult?.undo();
      return;
    }
    if (thumbnails(safety_areas).length) {
      const generateKey = (i: number) => `safety_area_${i}_thumbnail`;
      const formData = imageHandler.handleFormData(
        thumbnails(safety_areas) as {
          id: number;
          data: string;
        }[],
        generateKey,
      );
      try {
        await updateSafetyZoneThumbnail({ deviceID, body: formData }).unwrap();
      } catch {}
    }
  };

  return { sendRequest, isLoading, isSuccess };
};

export default useUpdateDeviceSetting;
