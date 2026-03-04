export function initGrained() {
  const options = {
    animate: true,
    patternWidth: 100,
    patternHeight: 100,
    grainOpacity: 0.075,
    grainDensity: 1,
    grainWidth: 1,
    grainHeight: 1,
  };

  grained("#grained", options);
}
