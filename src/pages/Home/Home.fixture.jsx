import { MemoryRouter } from "react-router-dom";
import HomeConnected from "./Home.connected.jsx";

export default (
  <MemoryRouter initialEntries={["/"]}>
    <HomeConnected />
  </MemoryRouter>
);
