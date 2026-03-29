import { useEffect, useState } from "react";

export function useTypewriter(lines) {
  const [text, setText] = useState("");
  const [li, setLi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  const [done, setDone] = useState(false);
  const key = lines.join("\n");
  useEffect(() => {
    setText("");
    setLi(0);
    setCi(0);
    setDel(false);
    setDone(false);
  }, [key]);
  useEffect(() => {
    if (done) return undefined;
    const cur = lines[li];
    if (!cur) return undefined;
    const delay = del ? 26 : ci === cur.length ? 1800 : 36;
    const t = setTimeout(() => {
      if (!del && ci < cur.length) {
        setText(cur.slice(0, ci + 1));
        setCi((c) => c + 1);
      } else if (!del && ci === cur.length) {
        if (li === lines.length - 1) {
          setDone(true);
          return;
        }
        setDel(true);
      } else if (del && ci > 0) {
        setText(cur.slice(0, ci - 1));
        setCi((c) => c - 1);
      } else {
        setDel(false);
        setLi((i) => i + 1);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, ci, del, li, done, lines, lines.length]);
  return { text, done };
}
