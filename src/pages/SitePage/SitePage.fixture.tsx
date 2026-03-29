import { MemoryRouter, Route, Routes } from "react-router-dom";
import SitePageConnected from "./SitePage.connected";

export default (
  <MemoryRouter initialEntries={["/page/how-we-work"]}>
    <Routes>
      <Route path="/page/:slug" element={<SitePageConnected />} />
    </Routes>
  </MemoryRouter>
);
