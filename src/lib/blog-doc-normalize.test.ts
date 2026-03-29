import {
  emptyBlogLocale,
  ensureBlogDocForExport,
  normalizeBlogDoc,
  type BlogDocCanonical,
} from "./blog-doc-normalize";

describe("emptyBlogLocale", () => {
  it("returns five empty strings", () => {
    expect(emptyBlogLocale()).toEqual({
      title: "",
      subtitle: "",
      readTime: "",
      excerpt: "",
      body: "",
    });
  });
});

describe("normalizeBlogDoc", () => {
  it.each([
    ["null", null],
    ["undefined", undefined],
    ["string", "x"],
    ["number", 1],
    ["array", []],
  ])("returns null for %s", (_, input) => {
    expect(normalizeBlogDoc(input)).toBeNull();
  });

  it("returns null when id missing or blank", () => {
    expect(normalizeBlogDoc({})).toBeNull();
    expect(normalizeBlogDoc({ id: "" })).toBeNull();
    expect(normalizeBlogDoc({ id: "   " })).toBeNull();
    expect(normalizeBlogDoc({ id: 123 })).toBeNull();
  });

  it("trims id", () => {
    const doc = normalizeBlogDoc({ id: "  my-post  " });
    expect(doc?.id).toBe("my-post");
  });

  it("normalizes full i18n doc like repo YAML", () => {
    const raw = {
      id: "60fps-trading",
      date: "2024-05-20",
      category: "Performance",
      draft: false,
      tags: ["React Native", "Performance"],
      i18n: {
        ru: {
          title: "RU title",
          subtitle: "RU sub",
          readTime: "6 мин",
          excerpt: "RU ex",
          body: "## Hello\n",
        },
        en: {
          title: "EN title",
          subtitle: "EN sub",
          readTime: "6 min",
          excerpt: "EN ex",
          body: "## Hi\n",
        },
      },
    };
    expect(normalizeBlogDoc(raw)).toEqual({
      id: "60fps-trading",
      date: "2024-05-20",
      category: "Performance",
      draft: false,
      tags: ["React Native", "Performance"],
      i18n: {
        ru: {
          title: "RU title",
          subtitle: "RU sub",
          readTime: "6 мин",
          excerpt: "RU ex",
          body: "## Hello\n",
        },
        en: {
          title: "EN title",
          subtitle: "EN sub",
          readTime: "6 min",
          excerpt: "EN ex",
          body: "## Hi\n",
        },
      },
    });
  });

  it("maps flat root title/body to i18n.en (legacy)", () => {
    const doc = normalizeBlogDoc({
      id: "legacy",
      title: "Hello",
      body: "Text",
    });
    expect(doc).toEqual({
      id: "legacy",
      date: "",
      category: "Uncategorized",
      draft: false,
      tags: [],
      i18n: {
        en: {
          title: "Hello",
          subtitle: "",
          readTime: "",
          excerpt: "",
          body: "Text",
        },
      },
    });
  });

  it("uses flat root when i18n is empty object", () => {
    const doc = normalizeBlogDoc({
      id: "x",
      i18n: {},
      title: "T",
      subtitle: "S",
    });
    expect(doc?.i18n.en).toMatchObject({ title: "T", subtitle: "S" });
    expect(doc?.i18n.ru).toBeUndefined();
  });

  it("filters tags to strings only", () => {
    const doc = normalizeBlogDoc({
      id: "t",
      tags: ["a", 2, null, "b", {}],
    });
    expect(doc?.tags).toEqual(["a", "b"]);
  });

  it("defaults category when missing", () => {
    expect(normalizeBlogDoc({ id: "x" })?.category).toBe("Uncategorized");
  });

  it("defaults date to empty string", () => {
    expect(normalizeBlogDoc({ id: "x" })?.date).toBe("");
  });

  it("coerces draft to boolean", () => {
    expect(normalizeBlogDoc({ id: "a", draft: true })?.draft).toBe(true);
    expect(normalizeBlogDoc({ id: "b", draft: "yes" })?.draft).toBe(true);
    expect(normalizeBlogDoc({ id: "c" })?.draft).toBe(false);
  });

  it("keeps only ru when en absent", () => {
    const doc = normalizeBlogDoc({
      id: "ru-only",
      i18n: {
        ru: { title: "Заголовок", subtitle: "", readTime: "", excerpt: "", body: "x" },
      },
    });
    expect(doc?.i18n.ru?.title).toBe("Заголовок");
    expect(doc?.i18n.en).toBeUndefined();
  });

  it("coerces non-string locale fields to empty string", () => {
    const doc = normalizeBlogDoc({
      id: "x",
      i18n: { en: { title: 1, body: null } },
    } as unknown);
    expect(doc?.i18n.en).toEqual({
      title: "",
      subtitle: "",
      readTime: "",
      excerpt: "",
      body: "",
    });
  });

  it("does not use flat root when i18n already has en", () => {
    const doc = normalizeBlogDoc({
      id: "x",
      title: "Root title",
      i18n: {
        en: { title: "En title", subtitle: "", readTime: "", excerpt: "", body: "" },
      },
    });
    expect(doc?.i18n.en?.title).toBe("En title");
  });
});

describe("ensureBlogDocForExport", () => {
  it("fills ru and en with empty strings for missing locales", () => {
    const doc: BlogDocCanonical = {
      id: "p",
      date: "2024-01-01",
      category: "Web3",
      draft: true,
      tags: ["t"],
      i18n: {
        en: {
          title: "Only EN",
          subtitle: "",
          readTime: "",
          excerpt: "",
          body: "b",
        },
      },
    };
    const out = ensureBlogDocForExport(doc);
    expect(out.i18n).toEqual({
      ru: emptyBlogLocale(),
      en: {
        title: "Only EN",
        subtitle: "",
        readTime: "",
        excerpt: "",
        body: "b",
      },
    });
    expect(out.tags).toEqual(["t"]);
    expect(out.draft).toBe(true);
  });

  it("merges partial locale fields with defaults", () => {
    const doc: BlogDocCanonical = {
      id: "q",
      date: "",
      category: "X",
      draft: false,
      tags: [],
      i18n: {
        ru: { title: "R", subtitle: "", readTime: "", excerpt: "", body: "" },
        en: { title: "", subtitle: "", readTime: "", excerpt: "", body: "body" },
      },
    };
    const out = ensureBlogDocForExport(doc);
    expect(out.i18n).toEqual({
      ru: { title: "R", subtitle: "", readTime: "", excerpt: "", body: "" },
      en: { title: "", subtitle: "", readTime: "", excerpt: "", body: "body" },
    });
  });
});
