export function linkActiveClass(pathname, to) {
  if (to === "/") return pathname === "/" ? "active" : "";
  if (pathname === to || pathname.startsWith(`${to}/`)) return "active";
  return "";
}
