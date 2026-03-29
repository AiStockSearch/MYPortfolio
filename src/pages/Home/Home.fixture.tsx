import { MemoryRouter } from "react-router-dom";
import HomeConnected from "./Home.connected";

export default (
  <MemoryRouter initialEntries={["/"]}>
    <HomeConnected />
  </MemoryRouter>
);
