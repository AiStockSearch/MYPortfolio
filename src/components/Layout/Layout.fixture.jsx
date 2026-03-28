import { MemoryRouter } from "react-router-dom";
import Layout from "./Layout.connected.jsx";

export default (
  <MemoryRouter initialEntries={["/"]}>
    <Layout>
      <div style={{ padding: "120px 40px 80px", color: "var(--muted)" }}>
        Page content preview
      </div>
    </Layout>
  </MemoryRouter>
);
