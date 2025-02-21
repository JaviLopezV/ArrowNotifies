import { useEffect } from "react";

const VAPID_PUBLIC_KEY =
  "BI39-j-0GtG0e1iZy8IZIwyqfHluHBD9Rkzdvy7yqBpnwAXyFBN4u8z6Wj3TL5GQpbhsedV2S6jHi-Y1Q9HSZMM";

const useServiceWorker = (setProcess) => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => registration.pushManager.getSubscription())
        .then((subscription) => {
          if (subscription) {
            // alert("Usuario ya suscrito:", subscription);
            setProcess(true);
            console.log("Usuario ya suscrito:", subscription);
          }
        })
        .catch((error) =>
          console.error("Error obteniendo la suscripción:", error)
        );
    } else {
      navigator.serviceWorker.register("/sw.js").then((registration) => {
        console.log("Service Worker registrado:", registration);

        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            registration.pushManager
              .subscribe({
                userVisibleOnly: true,
                applicationServerKey: VAPID_PUBLIC_KEY,
              })
              .then((subscription) => {
                console.log("Suscripción creada:", subscription);
                alert("suscripcion creada");
                setProcess(true);
                fetch("http://localhost:5000/subscribe", {
                  method: "POST",
                  body: JSON.stringify(subscription),
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
              });
          }
        });
      });
    }
  }, []);
};

export default useServiceWorker;
