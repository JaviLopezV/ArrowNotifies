import { useEffect } from "react";

const useCheckExchangeRate = (process) => {
  useEffect(() => {
    if (process) {
      const checkExchangeRate = async () => {
        try {
          const response = await fetch(
            "https://api.exchangerate-api.com/v4/latest/GBP",
            {
              headers: { Accept: "application/json" },
            }
          );

          const data = await response.json();
          const gbpToEur = data.rates.EUR; // Obtiene la tasa de la libra
          console.log("🚀 ~ checkExchangeRate ~ gbpToEur:", gbpToEur);

          if (gbpToEur >= 1.22) {
            sendNotification(`La libra subió a €${gbpToEur}`);
          } else if (gbpToEur <= 1.16) {
            sendNotification(`La libra bajó a €${gbpToEur}`);
          }
        } catch (error) {
          console.error("Error obteniendo la tasa de cambio:", error);
          alert(`Error obteniendo la tasa de cambio: ${error.message}`);
        }
      };

      // Revisar cada 5 minutos
      const interval = setInterval(checkExchangeRate, 300000);
      checkExchangeRate();

      return () => clearInterval(interval);
    }
  }, [process]);

  const sendNotification = async (message) => {
    const registration = await navigator.serviceWorker.ready;
    if (Notification.permission === "granted") {
      registration.showNotification("💰 Alerta de Tipo de Cambio", {
        body: message,
        icon: "/arrow.png",
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          registration.showNotification("💰 Alerta de Tipo de Cambio", {
            body: message,
            icon: "/arrow.png",
          });
        }
      });
    }
  };
};

export default useCheckExchangeRate;
