import '../styles/globals.css'
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import { ThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={true} value={{light: 'light', dark: 'dark', intranet: 'intranet', dark_intranet: 'dark-intranet'}} >
      <Component {...pageProps} />
    </ThemeProvider>)
}

export default MyApp
