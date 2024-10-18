import { ApiGasStationData, GasStationData } from "@/types/gasStation";

class GasStationService {
  private data: GasStationData[] = [];

  private parseAdresse(adresse: string): {
    street: string;
    zipCode: string;
    district: string;
  } {
    const match = adresse.match(/^(.*?)\s*\((\d{5})\s*(.*?)\)$/);
    if (match) {
      return {
        street: match[1].trim(),
        zipCode: match[2],
        district: match[3],
      };
    }
    return { street: "", zipCode: "", district: "" };
  }

  private transformData(apiData: ApiGasStationData): GasStationData {
    const { street, zipCode, district } = this.parseAdresse(
      apiData.attributes.adresse
    );
    return {
      objectid: apiData.attributes.objectid,
      street,
      zipCode,
      district,
      x: apiData.geometry.x,
      y: apiData.geometry.y,
    };
  }

  async loadData() {
    if (this.data.length === 0) {
      const response = await fetch(
        "https://geoportal.stadt-koeln.de/arcgis/rest/services/verkehr/gefahrgutstrecken/MapServer/0/query?where=objectid%20is%20not%20null&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=%2A&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson"
      );
      const apiResponse: any = await response.json();
      this.data = apiResponse.features.map((item: any) =>
        this.transformData(item)
      );
    }
  }

  getDistricts(limit?: number): {
    id: string;
    name: string;
    count: number;
  }[] {
    const districtsSet = new Set(this.data.map((station) => station.district));
    const districtsArray = Array.from(districtsSet)
      .sort()
      .map((district, index) => ({
        id: `district-${index}`,
        name: district,
        count: this.data.filter((station) => station.district === district)
          .length,
      }));
    return limit ? districtsArray.slice(0, limit) : districtsArray;
  }

  getData(limit?: number): GasStationData[] {
    return limit ? this.data.slice(0, limit) : this.data;
  }
}

export const gasStationService = new GasStationService();
