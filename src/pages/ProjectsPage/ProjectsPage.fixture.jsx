import { MemoryRouter } from "react-router-dom";
import ProjectsPageConnected from "./ProjectsPage.connected.jsx";

export default (
  <MemoryRouter initialEntries={["/projects"]}>
    <ProjectsPageConnected />
  </MemoryRouter>
);
