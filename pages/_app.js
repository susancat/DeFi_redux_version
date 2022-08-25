import "../styles/globals.css";
import { wrapper, store } from "../store/store";
import { Provider } from "react-redux";
import Layout from '../components/layout'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Layout>
  );
}

export default wrapper.withRedux(MyApp);