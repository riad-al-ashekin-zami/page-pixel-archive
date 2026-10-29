// Column keys preserve the existing support matrix when rendered as a semantic table.
export const MANAGEMENT_COMPARISON = [
  { mgmt: true, maint: false, diy: false },
  { mgmt: "add_on", maint: true, diy: false },
  { mgmt: true, maint: false, diy: false },
  { mgmt: true, maint: false, diy: false },
  { mgmt: true, maint: false, diy: false },
  { mgmt: true, maint: "basic", diy: false },
  { mgmt: true, maint: false, diy: false },
  { mgmt: true, maint: true, diy: false },
] as const;
