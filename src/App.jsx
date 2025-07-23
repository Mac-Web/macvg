import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Tab from "./pages/Tab";
import ScrollTop from "./components/ScrollTop";
import Cloaker from "./components/Cloaker";

function App() {
  return (
    <HashRouter>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<Tab page="new" />} />
        <Route path="/trending" element={<Tab page="trending" />} />
        <Route path="/recent" element={<Tab page="recent" />} />
        <Route path="/settings" element={<Tab page="settings" />} />
        <Route path="/game/" element={<Game />} />
        <Route path="/game/:id" element={<Game />} />
      </Routes>
      <Cloaker />
    </HashRouter>
  );
}

export default App;
