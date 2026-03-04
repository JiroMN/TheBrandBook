export function getVariableValue(variableName) {
  if (!variableName) {
    throw new Error("getVariableValue requires a CSS variable name.");
  }

  const value = getComputedStyle(document.documentElement).getPropertyValue(
    variableName,
  );

  const trimmed = value.trim();

  if (trimmed.startsWith(".")) {
    return `0${trimmed}`;
  }

  return trimmed;
}
