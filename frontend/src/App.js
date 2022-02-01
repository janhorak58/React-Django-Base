import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <HashRouter>
      <Header />
      <main id="main-content-container">
        <Routes>
          <Route path="/" element={<HomeScreen />} exact />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  );
}

export default App;
