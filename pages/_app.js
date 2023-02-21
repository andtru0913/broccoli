import "../styles/globals.css";
import "../styles/markdown.css";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/common/main.css";
import "../styles/fullcalendar.css";

import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
