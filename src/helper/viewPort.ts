export function viewPort(increase: number) {
  increase = (increase || 1);

  return {
    vw: Math.max(document.documentElement.clientWidth || 0, innerWidth || 0) * increase,
    vh: Math.max(document.documentElement.clientHeight || 0, innerHeight || 0) * increase,
  };
}
