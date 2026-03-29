import { MemoryRouter } from "react-router-dom";
import ResumeConnected from "./Resume.connected";

export default (
  <MemoryRouter initialEntries={["/resume"]}>
    <ResumeConnected />
  </MemoryRouter>
);
