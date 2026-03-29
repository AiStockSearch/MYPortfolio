import { MemoryRouter } from "react-router-dom";
import ProjectsPageConnected from "./ProjectsPage.connected";

export default (
  <MemoryRouter initialEntries={["/projects"]}>
    <ProjectsPageConnected />
  </MemoryRouter>
);
