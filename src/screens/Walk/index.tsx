import React, { useState } from "react";

import { formatCoordinates, formatUTC } from "~/utils";
import WalkTopTabNav from "~/navigator/WalkTopTabNav";

const Walk = () => {
  const [list, setList] = useState<any[]>([]);

  /* useEffect(() => {
    const dataArray: number[] =
      list[0]?.advertising.manufacturerData.bytes.slice(7, 20);

    if (!dataArray || dataArray.length === 0) return;

    const { date, utc } = formatUTC(dataArray.slice(0, 5));
    const { lat, lng } = formatCoordinates(dataArray.slice(5, 12));
    const battery = dataArray[12];

    console.log(date, utc, lat, lng, battery);
  }, [list]); */

  return <WalkTopTabNav />;
};

export default Walk;
