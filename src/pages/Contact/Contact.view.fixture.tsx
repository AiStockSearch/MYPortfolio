import ContactView from "./Contact.view";

const ui = {
  sec: "contact",
  title: "Fixture title",
  introLead: "Hello ",
  introHl: "world",
  introRest: ".",
  availTitle: "Open",
  availBody: "For collaborations.",
  formTitle: "Write",
  formSub: "We use mailto.",
  mailtoNote: "Note text.",
  labels: {
    name: "Name",
    email: "Email",
    subject: "Subject",
    message: "Message",
  },
  placeholders: {
    name: "Name",
    email: "Email",
    message: "Message",
  },
  subjects: {
    job: "Job",
    freelance: "Freelance",
    collab: "Collab",
    other: "Other",
  },
  errors: {
    name: "Required",
    email: "Invalid",
    message: "Too short",
  },
  compose: "Send",
  channels: {
    tg: { label: "Telegram", val: "@user" },
    email: { label: "Email", val: "a@b.co" },
    gh: { label: "GitHub", val: "gh" },
    habr: { label: "Habr", val: "habr" },
  },
};

const channels = [
  {
    icon: "✈",
    label: "Telegram",
    val: "@fixture",
    href: "https://t.me",
    external: true,
  },
];

export default (
  <ContactView
    ui={ui}
    form={{ name: "", email: "", subject: "job", message: "" }}
    errors={{}}
    channels={channels}
    setField={() => () => {}}
    openMailto={() => {}}
  />
);
