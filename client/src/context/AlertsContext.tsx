import { createContext } from "react";
import { useAlerts } from "../hooks/useAlerts";

interface AlertsContextProps {
  showAlert: (
    id: string,
    message: string,
    time: number,
    status: "green" | "red" | "yellow",
    canceable: boolean
  ) => void;
  cancelAlert: (id: string) => void;
  Alerts: React.FC;
}

export const AlertsContext = createContext<AlertsContextProps>({
  showAlert: () => {},
  cancelAlert: () => {},
  Alerts: () => null,
});

export const AlertsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { showAlert, Alerts, cancelAlert } = useAlerts();

  return (
    <AlertsContext.Provider value={{ showAlert, Alerts, cancelAlert }}>
      {children}
    </AlertsContext.Provider>
  );
};
