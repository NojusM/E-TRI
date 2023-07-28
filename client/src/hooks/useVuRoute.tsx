import { useEffect, useState } from "react";
import { FormParameters, VuResponse } from "../types/types";
import getVuRoute from "../api/getVuRoute";

export default function useVuRoute(formParameters: FormParameters) {
  const [vuResponse, setVuResponse] = useState<VuResponse[]>([]);
  const [vuLoading, setVuLoading] = useState<
    "loading" | "error" | "succ" | null
  >(null);

  useEffect(() => {
    if (
      formParameters.idFrom === null ||
      formParameters.idTo === null ||
      formParameters.fromSec === null ||
      formParameters.toSec === null ||
      formParameters.initCh === null ||
      formParameters.car === null ||
      formParameters.fromDate === null ||
      formParameters.toDate === null ||
      formParameters.noOfRoutes === null ||
      formParameters.temp === null ||
      formParameters.weather === null ||
      formParameters.detour === null ||
      formParameters.model === null
    ) {
      return;
    }
    const fetchRoute = async () => {
      setVuLoading("loading");
      const data = await getVuRoute(formParameters);
      if (data === "error") {
        setVuLoading("error");
        return;
      } else if (data === "cancel") {
        setVuLoading(null);
        return;
      } else if (data === undefined) {
        setVuLoading(null);
        return;
      }
      setVuLoading("succ");
      setVuResponse((current) => [...current, data]);
    };
    fetchRoute();
    console.log(vuResponse);
  }, [formParameters]);

  return { vuResponse, vuLoading, setVuLoading };
}
