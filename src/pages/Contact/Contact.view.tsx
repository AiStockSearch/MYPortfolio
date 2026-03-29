import { CONTACT_PAGE_STYLES } from "../../styles/contactPageStyles";

export default function ContactView({ ui, form, errors, channels, setField, openMailto }) {
  return (
    <>
      <style>{CONTACT_PAGE_STYLES}</style>
      <div className="contact-page">
        <div className="contact-wrap">
          <div className="contact-left">
            <p className="sec-label">{ui.sec}</p>
            <h1 className="sec-title">{ui.title}</h1>
            <p className="contact-intro">
              {ui.introLead}
              <span className="hl">{ui.introHl}</span>
              {ui.introRest}
            </p>

            <div className="contact-channels">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="cc"
                  {...(c.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  <span className="cc-icon">{c.icon}</span>
                  <div className="cc-body">
                    <p className="cc-label">{c.label}</p>
                    <p className="cc-val">{c.val}</p>
                  </div>
                  <span className="cc-arrow">→</span>
                </a>
              ))}
            </div>

            <div className="avail-box">
              <span className="av-dot" />
              <p className="av-text">
                <strong>{ui.availTitle}</strong>
                <br />
                {ui.availBody}
              </p>
            </div>
          </div>

          <div className="contact-form-wrap">
            <p className="form-title">{ui.formTitle}</p>
            <p className="form-sub">{ui.formSub}</p>
            <p className="mailto-note">{ui.mailtoNote}</p>

            <div className="cf">
              <div className="cf-row">
                <div className="cf-group">
                  <label className="cf-label">{ui.labels.name}</label>
                  <input
                    className="cf-input"
                    placeholder={ui.placeholders.name}
                    value={form.name}
                    onChange={setField("name")}
                  />
                  {errors.name && (
                    <span className="cf-error">{errors.name}</span>
                  )}
                </div>
                <div className="cf-group">
                  <label className="cf-label">{ui.labels.email}</label>
                  <input
                    className="cf-input"
                    placeholder={ui.placeholders.email}
                    value={form.email}
                    onChange={setField("email")}
                  />
                  {errors.email && (
                    <span className="cf-error">{errors.email}</span>
                  )}
                </div>
              </div>

              <div className="cf-group">
                <label className="cf-label">{ui.labels.subject}</label>
                <select
                  className="cf-select"
                  value={form.subject}
                  onChange={setField("subject")}
                >
                  <option value="job">{ui.subjects.job}</option>
                  <option value="freelance">{ui.subjects.freelance}</option>
                  <option value="collab">{ui.subjects.collab}</option>
                  <option value="other">{ui.subjects.other}</option>
                </select>
              </div>

              <div className="cf-group">
                <label className="cf-label">{ui.labels.message}</label>
                <textarea
                  className="cf-textarea"
                  placeholder={ui.placeholders.message}
                  value={form.message}
                  onChange={setField("message")}
                />
                {errors.message && (
                  <span className="cf-error">{errors.message}</span>
                )}
              </div>

              <button type="button" className="cf-submit" onClick={openMailto}>
                {ui.compose}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
