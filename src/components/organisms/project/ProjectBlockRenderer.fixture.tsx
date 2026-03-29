import ProjectBlockRenderer from "./ProjectBlockRenderer";
import { ProjectCatalogFixtureWrap } from "./ProjectCatalogFixtureWrap";

const wrap = (node) => <ProjectCatalogFixtureWrap>{node}</ProjectCatalogFixtureWrap>;

export default {
  heroImage: wrap(<ProjectBlockRenderer block={{ type: "heroImage" }} />),
  sectionOverview: wrap(
    <ProjectBlockRenderer
      block={{ type: "section", sectionKey: "overview" }}
    />
  ),
  prose: wrap(
    <ProjectBlockRenderer
      block={{ type: "prose", text: "## Hello\n\nParagraph with **bold**." }}
    />
  ),
  keyResults: wrap(
    <ProjectBlockRenderer
      block={{
        type: "keyResults",
        items: [
          { lbl: "Users", val: "10k" },
          { lbl: "Crash-free", val: "99.9%" },
        ],
      }}
    />
  ),
  techStack: wrap(
    <ProjectBlockRenderer
      block={{ type: "techStack", tags: ["Go", "Postgres", "gRPC"] }}
    />
  ),
  partner: wrap(
    <ProjectBlockRenderer
      block={{
        type: "partner",
        name: "ACME Corp",
        href: "https://example.com",
      }}
    />
  ),
  appLinks: wrap(
    <ProjectBlockRenderer
      block={{
        type: "appLinks",
        items: [
          { label: "App Store", href: "https://apps.apple.com" },
          { label: "Web", href: "https://example.com" },
        ],
      }}
    />
  ),
  image: wrap(
    <ProjectBlockRenderer
      block={{
        type: "image",
        src: "/favicon.svg",
        alt: "Fixture",
        caption: "Caption text",
      }}
    />
  ),
  unknownType: wrap(<ProjectBlockRenderer block={{ type: "unknown" }} />),
};
