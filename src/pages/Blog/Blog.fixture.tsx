import { MemoryRouter } from "react-router-dom";
import BlogConnected from "./Blog.connected";

export default (
  <MemoryRouter initialEntries={["/blog"]}>
    <BlogConnected />
  </MemoryRouter>
);
