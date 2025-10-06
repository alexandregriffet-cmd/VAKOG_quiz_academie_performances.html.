export default async function handler(req, res) {
  try {
    const { token, password } = req.query;
    if (!token) return res.status(400).json({ ok: false, error: "missing_token" });

    const url = process.env.UPSTASH_REDIS_REST_URL;
    const auth = process.env.UPSTASH_REDIS_REST_TOKEN;

    const redis = async (command, ...args) => {
      const r = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${auth}`, "Content-Type": "application/json" },
        body: JSON.stringify({ command, args })
      });
      return r.json();
    };

    const getResp = await redis("GET", `token:${token}`);
    const data = getResp.result ? JSON.parse(getResp.result) : null;
    if (!data) return res.status(404).json({ ok: false, error: "invalid_token" });
    if (data.expiresAt && new Date(data.expiresAt) < new Date())
      return res.status(410).json({ ok: false, error: "expired_token" });
    if (data.passwordHash && password !== data.passwordHash)
      return res.status(401).json({ ok: false, error: "bad_password" });
    if (data.used)
      return res.status(409).json({ ok: false, error: "already_used" });

    data.used = true;
    await redis("SET", `token:${token}`, JSON.stringify(data));

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ ok: false, error: "server_error" });
  }
}
