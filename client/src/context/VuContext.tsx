import { createContext, useContext } from "react";
import useVuRoute from "../hooks/useVuRoute";
import { FormContext } from "./FormContext";

interface VuProps {
  vuResponse: any[];
  vuLoading: "loading" | "error" | "succ" | null;
  setVuLoading: React.Dispatch<
    React.SetStateAction<"loading" | "error" | "succ" | null>
  >;
}

export const VuContext = createContext<VuProps>({
  vuResponse: [],
  vuLoading: null,
  setVuLoading: () => {},
});

export const VuProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { formParameters } = useContext(FormContext);
  const { vuResponse, vuLoading, setVuLoading } = useVuRoute(formParameters);

  return (
    <VuContext.Provider
      value={{
        vuResponse,
        vuLoading,
        setVuLoading,
      }}
    >
      {children}
    </VuContext.Provider>
  );
};
