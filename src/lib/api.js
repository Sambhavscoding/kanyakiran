// Client-side helper: sends the registration to our own API route.
// Returns { ok, message, errors } and never throws on a normal server response.
export async function submitRegistration(values) {
  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const json = await res.json().catch(() => ({}));
    return { ok: res.ok && json.ok === true, message: json.message, errors: json.errors };
  } catch {
    return { ok: false, message: "Network error. Please check your connection and try again." };
  }
}