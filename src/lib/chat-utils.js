export function extractTextFromEvent(event) {
  const raw = event?.data ?? event;
  if (typeof raw !== "string") return null;

  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.content === "string") return parsed.content;
    if (parsed && typeof parsed.message === "string") return parsed.message;
    if (typeof parsed === "string") return parsed;
  } catch {
    return raw;
  }

  return null;
}

export function getRandomDelay(minDelay, maxDelay) {
  return minDelay + Math.random() * (maxDelay - minDelay);
}

export function getRandomLine(lines) {
  if (!Array.isArray(lines) || lines.length === 0) return "";
  const index = Math.floor(Math.random() * lines.length);
  return lines[index];
}
