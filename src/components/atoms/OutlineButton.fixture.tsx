import { OUTLINE_BUTTON_STYLES } from "./outlineButton.styles";
import OutlineButton from "./OutlineButton";

export default {
  Idle: (
    <>
      <style>{OUTLINE_BUTTON_STYLES}</style>
      <div style={{ padding: 24, display: "flex", gap: 8 }}>
        <OutlineButton active={false} onClick={() => {}}>
          Filter
        </OutlineButton>
        <OutlineButton active onClick={() => {}}>
          Active
        </OutlineButton>
      </div>
    </>
  ),
};
