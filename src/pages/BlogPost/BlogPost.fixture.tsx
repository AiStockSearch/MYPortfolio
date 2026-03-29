import { MemoryRouter, Route, Routes } from "react-router-dom";
import BlogPostConnected from "./BlogPost.connected";

export default (
  <MemoryRouter initialEntries={["/blog/offline-first-rn"]}>
    <Routes>
      <Route path="/blog/:id" element={<BlogPostConnected />} />
    </Routes>
  </MemoryRouter>
);
