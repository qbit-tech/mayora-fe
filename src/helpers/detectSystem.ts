const OTHER_SYSTEM_ACCOUNTS = [
  '01GWSEE4G1PPXK3V5VMH0DKTZ4', //production
  '01GRQWQ44X7MN3FPJ8JNYPY88X', //staging
  '01H27H3QJGXSJ97CJ48WWG4P2S', //development
];
export function isOtherSystem(userId: string) {
  return OTHER_SYSTEM_ACCOUNTS.includes(userId);
}
