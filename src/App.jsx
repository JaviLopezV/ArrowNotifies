import { useState } from "react";

import useServiceWorker from "./hooks/useServiceWorker";
import useCheckExchangeRate from "./hooks/useCheckExchangeRate";

function App() {
  const [process, setProcess] = useState(undefined)
  useServiceWorker(setProcess);
  useCheckExchangeRate(process);

  return <h1>¡Notificaciones Push en React PWA!</h1>;
}

export default App;
