const permissions = {
  Admin: ["dashboard", "users", "reports"],
  Teacher: ["dashboard", "reports"],
  Student: ["dashboard"],
};

export function hasPermission(role, page) {
  return permissions[role]?.includes(page) ?? false;
}