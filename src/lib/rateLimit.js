// A very small in-memory rate limiter: at most `limit` requests per `windowMs` per key (IP).
//
// LIMITATION: the counters live in this server process's memory. On serverless hosting
// (e.g. Vercel) each instance has its own memory, so this is only a speed bump against
// casual spam, not a hard guarantee. For a hard limit use a shared store (e.g. Upstash Redis).

const hits = new Map(); // key -> array of timestamps (ms)

export function isRateLimited(key, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);

  // Keep the map from growing forever
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= windowMs)) hits.delete(k);
    }
  }
  return false;
}