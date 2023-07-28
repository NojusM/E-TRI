import { useState, useEffect } from "react";
export interface AlertsProps {
  id: string;
  message: string;
  time: number;
  status: "green" | "red" | "yellow";
  cancelable: boolean;
}

export const useAlerts = () => {
  const [alerts, setAlerts] = useState<AlertsProps[]>([]);

  const showAlert = (
    id: string,
    message: string,
    time: number,
    status: "green" | "red" | "yellow",
    cancelable = false
  ) => {
    const newAlert = {
      id,
      message,
      time,
      status,
      cancelable,
    };
    setAlerts((current) => [...current, newAlert]);
  };

  const hideAlert = (index: number) => {
    setAlerts((current) => current.filter((_, i) => i !== index));
  };

  const cancelAlert = (id: string) => {
    setAlerts((current) => current.filter((alert) => alert.id !== id));
  };

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    alerts.forEach((alert, index) => {
      if (!alert.cancelable) {
        const timeout = setTimeout(() => {
          hideAlert(index);
        }, alert.time * 1000);
        timeouts.push(timeout);
      }
    });

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [alerts]);

  const Alerts = () => (
    <div className="alerts-wrapper">
      {alerts.map((alert, index) => (
        <div
          key={index}
          className="alert"
          style={{ backgroundColor: alert.status }}
        >
          <div className="message">{alert.message}</div>
        </div>
      ))}
    </div>
  );

  return { showAlert, Alerts, cancelAlert };
};
