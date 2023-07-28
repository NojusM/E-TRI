import { createContext, useState } from "react";
import { FormParameters } from "../types/types";
interface FormContextProps {
  formParameters: FormParameters;
  setFormParameters: React.Dispatch<React.SetStateAction<FormParameters>>;
}

export const FormContext = createContext<FormContextProps>({
  formParameters: {
    idFrom: null,
    idTo: null,
    fromSec: null,
    toSec: null,
    initCh: null,
    car: null,
    fromDate: null,
    toDate: null,
    noOfRoutes: null,
    temp: null,
    weather: null,
    detour: null,
    model: null,
  },
  setFormParameters: () => {},
});

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [formParameters, setFormParameters] = useState<FormParameters>({
    idFrom: null,
    idTo: null,
    fromSec: null,
    toSec: null,
    initCh: null,
    car: null,
    fromDate: null,
    toDate: null,
    noOfRoutes: null,
    temp: null,
    weather: null,
    detour: null,
    model: null,
  });
  return (
    <FormContext.Provider
      value={{
        formParameters,
        setFormParameters,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
