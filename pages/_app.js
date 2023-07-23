import Context from "../context/Context";
import Layouts from "../layouts/Layouts";
import "../styles/globals.css";



function MyApp({ Component, pageProps }) {

  return (
    <div className="max-w-[var(--xxlg)] m-auto bg-color-dark-1">
      <Context>
        <Layouts>
          <Component {...pageProps} />
        </Layouts>
      </Context>
    </div>
  )
}

export default MyApp
