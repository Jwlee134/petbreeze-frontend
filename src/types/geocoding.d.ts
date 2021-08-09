interface ICoords {
  crs: string;
  x: number;
  y: number;
}

interface IArea {
  name: string;
  center: ICoords;
  alias?: string;
}

interface IAddition {
  type: string;
  value: string;
}

interface IResults {
  name: "addr" | "admcode";
  code: {
    id: string;
    type: string;
    mappingId: string;
  };
  region: {
    area0: IArea;
    area1: IArea;
    area2: IArea;
    area3: IArea;
    area4: IArea;
  };
  land?: {
    type: string;
    name: string;
    number1: string;
    number2: string;
    addition0: IAddition;
    addition1: IAddition;
    addition2: IAddition;
    addition3: IAddition;
    addition4: IAddition;
    coords: ICoords;
  };
}

export interface IReverseGeocoding {
  status: {
    code: number;
    name: string;
    message: string;
  };
  results: IResults[];
}
