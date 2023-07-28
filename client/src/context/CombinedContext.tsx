import React from "react";
import { SearchProvider } from "./SearchContext";
import { CoordinateProvider } from "./CoordinateContext";
import { AlertsProvider } from "./AlertsContext";
import { FormProvider } from "./FormContext";
import { VuProvider } from "./VuContext";
interface Props {
  children: React.ReactNode;
}

export const CombinedContextProvider: React.FC<Props> = ({ children }) => {
  return (
    <CoordinateProvider>
      <SearchProvider>
        <AlertsProvider>
          <FormProvider>
            <VuProvider>{children}</VuProvider>
          </FormProvider>
        </AlertsProvider>
      </SearchProvider>
    </CoordinateProvider>
  );
};
