import { PatchCollection } from "@reduxjs/toolkit/dist/query/core/buildThunks";
import deviceApi, { AreaResponse, GeoJsonType } from "~/api/device";
import { serverImageUri } from "~/constants";
import { store } from "~/store";
import imageHandler from "~/utils/imageHandler";

const useUpdateDeviceSetting = (deviceID: number) => {
  const [updateSetting, { isLoading: updatingDeviceSetting }] =
    deviceApi.useUpdateDeviceSettingMutation();
  const [updateSafetyZoneThumbnail, { isLoading: updatingThumbnail }] =
    deviceApi.useUpdateSafetyZoneThumbnailMutation();

  const isLoading = updatingDeviceSetting || updatingThumbnail;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const excludeThumbnail = ({ thumbnail, ...rest }: AreaResponse) => rest;

  const formatCoord = (area: Omit<AreaResponse, "thumbnail">) => ({
    ...area,
    coordinate: {
      type: GeoJsonType.Point as GeoJsonType.Point,
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
        area =>
          area.thumbnail !== null && !area.thumbnail.includes(serverImageUri),
      )
      .map(area => ({ id: area.safety_area_number, data: area.thumbnail }));

  const sendRequest = async (
    safety_areas: AreaResponse[],
    collection_period = 300,
  ) => {
    let putResult: PatchCollection | null = null;
    try {
      putResult = store.dispatch(
        deviceApi.util.updateQueryData("getDeviceSetting", deviceID, draft => {
          draft.collection_period = collection_period;
          draft.safety_areas = safety_areas;
        }),
      );
      await updateSetting({
        deviceID,
        body: { safety_areas: formatArea(safety_areas), collection_period },
      }).unwrap();
    } catch {
      putResult?.undo();
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

  return { sendRequest, isLoading };
};

export default useUpdateDeviceSetting;
