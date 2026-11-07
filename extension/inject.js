/* Free Zoot · Google AI Pro Offer Injector — MAIN world
 * اعتراض طلبات الدفع داخل one.google.com واستبدال عناصر الاشتراك برمز العرض المحدد.
 * حقوق النشر محفوظة لقناة التليجرام: https://t.me/Free_Zoot_Dis
 */
(() => {
  if (window.__GAPT_HOOKED) return;
  window.__GAPT_HOOKED = true;

  const TG_URL = "https://t.me/Free_Zoot_Dis";
  const PREFIX = "subs:com.google.android.apps.subscriptions.red:";

  const TOKENS = {
    "12m": "AVbCH/cspB8VdqKJ+ax/uPxUFAVuYRPX4iSjtg4Fu0PG9zUeURSM7y//LlQva1dCd/rbKVM6EJmyiG/C9BoQ95pMl8yDCHuiwCvM5CuGJME=",
    "6m_ss": "AVbCH/cgl4zvPT2Lqw95Gn+RYAJIVwFwi783i6uVprX7u3MCa5J4CcTXH5RABa5WjBrUoQnwf8vI10TNV7ktd26myIdxqIwGmNoJ5ofYNqpQ10RKoSvHs75wsfA=",
    "6m": "AVbCH/fUON3w8hpfeutprA3BMQwrBwYIB6Y8CSWi1isDCDswKUUhGQ3dluj5WXsNKOvr8K5UULBGrRsf4KlW1rHLz0fF3SvxQhBFRbBOHCA=",
    "6m_2": "AVbCH/cJ5SeHgkVRt+bdcrapx/aLSu2kbsBgMdI413zbllDNsNQoC/zVlG/Npbu55WlMzBwWPhUedIvZFDg7fw0CmCv/8DKj04IZ21pK7mrV/hh5"
  };
  const YT_FREE_TOK = "AVbCH/eW4Nfp8KBl0zlm7x9PhaiCvpnqwUuL2D8NFPBQgmM9+HuYS1h2xH5lLWU/BsBj775LK5GqK8UHKqoSzhDDz+PqP3paNesqLU0r9i6XCrYa";

  let currentTest = null;
  let subId = null;

  function makeCfg(layer) {
    if (!layer || layer === "off" || !TOKENS[layer]) return null;
    return {
      name: "gapt_" + layer,
      full_items: [
        [[PREFIX + "g1.2tb.ai.subs_variant", 21], null, null, null, 1, [TOKENS[layer]]],
        [[PREFIX + "g1.youtube_premium_individual_add_on", 21], null, null, null, 1, [YT_FREE_TOK]]
      ],
      ear8: null
    };
  }

  /* ---------- شريط الحالة أسفل الصفحة + رابط انضم إلينا ---------- */
  let badge = null;
  let statusTextEl = null;
  function showBadge(text, color) {
    try {
      if (!document.body) return;
      if (!badge) {
        badge = document.createElement("div");
        badge.dir = "rtl";
        badge.style.cssText = "position:fixed;right:14px;bottom:14px;z-index:2147483647;" +
          "padding:10px 14px;border-radius:10px;font:12.5px/1.6 'Segoe UI',Tahoma,Roboto,sans-serif;" +
          "box-shadow:0 4px 14px rgba(0,0,0,.18);border:1px solid #cfd8e3;background:#fff;color:#1d2c47;max-width:310px;" +
          "display:flex;flex-direction:column;gap:6px;text-align:right;";
        statusTextEl = document.createElement("div");
        statusTextEl.style.fontWeight = "700";

        const joinLink = document.createElement("a");
        joinLink.href = TG_URL;
        joinLink.target = "_blank";
        joinLink.rel = "noopener noreferrer";
        joinLink.textContent = "✈️ انضم إلينا على تليجرام · Free Zoot";
        joinLink.style.cssText = "display:inline-block;padding:4px 10px;border-radius:6px;background:#2481cc;color:#fff;" +
          "text-decoration:none;font-size:11.5px;font-weight:700;text-align:center;";

        badge.appendChild(statusTextEl);
        badge.appendChild(joinLink);
        document.body.appendChild(badge);
      }
      statusTextEl.textContent = text;
      badge.style.background = color || "#fff";
    } catch (e) {}
  }

  function refreshBadge() {
    if (!currentTest) {
      showBadge("أداة الحقن: غير مفعّلة", "#f5f5f5");
    } else {
      const label = {
        "12m": "12 شهراً (المرحلة 1)",
        "6m_ss": "6 أشهر SS (المرحلة 2)",
        "6m": "6 أشهر (المرحلة 3)",
        "6m_2": "6 أشهر (احتياطي)"
      }[currentTest.layer] || currentTest.layer;
      showBadge("✅ تم تفعيل الحقن · " + label + (subId ? " · تمديد متراكم" : ""), "#eaf7ea");
    }
  }

  /* ---------- تعديل الطلبات ---------- */
  function patchNode(node) {
    if (!Array.isArray(node) || !currentTest || !Array.isArray(currentTest.full_items)) return false;
    let patched = false;
    if (node.length > 12 && Array.isArray(node[12])) {
      if (Array.isArray(node[7]) && Array.isArray(node[7][5]) && node[7][5].length > 0) subId = node[7][5][0];
      node[12] = currentTest.full_items;
      const mode = (currentTest.ear8 && currentTest.ear8[1]) || 5;
      if (currentTest.ear8) node[7] = currentTest.ear8;
      else if (Array.isArray(node[7]) && Array.isArray(node[7][5]) && node[7][5].length > 0) node[7][1] = mode;
      else if (subId) node[7] = [null, mode, null, null, null, [subId]];
      patched = true;
    }
    if (node.length > 10 && Array.isArray(node[10]) && Array.isArray(node[10][0])) {
      node[10] = [currentTest.full_items];
      if (Array.isArray(node[2]) && Array.isArray(node[2][2]) && Array.isArray(node[2][2][8])) {
        node[2][2][8] = [currentTest.full_items];
      }
      if (currentTest.ear8) node[6] = currentTest.ear8;
      patched = true;
    }
    return patched;
  }

  function rewriteFreq(bodyStr) {
    if (typeof bodyStr !== "string" || !bodyStr.includes("f.req=") || !currentTest) return bodyStr;
    try {
      const parts = bodyStr.split("&");
      for (let i = 0; i < parts.length; i++) {
        if (parts[i].startsWith("f.req=")) {
          const raw = decodeURIComponent(parts[i].slice(6).replace(/\+/g, " "));
          const outer = JSON.parse(raw);
          let changed = false;
          if (Array.isArray(outer)) {
            for (const group of outer) {
              if (!Array.isArray(group)) continue;
              for (const call of group) {
                if (Array.isArray(call) && call[0] === "Ngbm" && typeof call[1] === "string") {
                  const payload = JSON.parse(call[1]);
                  if (Array.isArray(payload)) {
                    if (patchNode(payload[0])) changed = true;
                    if (patchNode(payload[1])) changed = true;
                  }
                  if (changed) call[1] = JSON.stringify(payload);
                }
              }
            }
          }
          if (changed) {
            parts[i] = "f.req=" + encodeURIComponent(JSON.stringify(outer));
            return parts.join("&");
          }
        }
      }
    } catch (e) {}
    return bodyStr;
  }

  const origSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function (body) {
    try {
      if (typeof body === "string" && body.includes("Ngbm")) body = rewriteFreq(body);
    } catch (e) {}
    return origSend.call(this, body);
  };

  function rewriteUrl(val) {
    const s = String(val || "");
    if (!s.includes("/eacquire/multiline") || !currentTest) return val;
    try {
      const u = new URL(s, location.origin);
      const earStr = u.searchParams.get("ear");
      if (!earStr) return val;
      const ear = JSON.parse(earStr);
      if (Array.isArray(ear[8]) && Array.isArray(ear[8][5]) && ear[8][5].length > 0) subId = ear[8][5][0];
      if (Array.isArray(ear[13]) && Array.isArray(currentTest.full_items)) ear[13][0] = currentTest.full_items;
      if (Array.isArray(ear[4]) && typeof ear[4][0] === "string" && Array.isArray(currentTest.full_items)) {
        try {
          const inner4 = JSON.parse(atob(ear[4][0]));
          if (Array.isArray(inner4) && inner4.length > 8) {
            inner4[8] = [currentTest.full_items];
            ear[4][0] = btoa(JSON.stringify(inner4));
          }
        } catch (e4) {}
      }
      const mode = (currentTest.ear8 && currentTest.ear8[1]) || 5;
      if (currentTest.ear8) ear[8] = currentTest.ear8;
      else if (Array.isArray(ear[8]) && Array.isArray(ear[8][5]) && ear[8][5].length > 0) ear[8][1] = mode;
      else if (subId) ear[8] = [null, mode, null, null, null, [subId]];
      ear[24] = null;
      u.searchParams.set("ear", JSON.stringify(ear));
      return u.toString();
    } catch (e) {
      return val;
    }
  }

  if (window.TrustedTypePolicy && TrustedTypePolicy.prototype.createScriptURL) {
    const origCreate = TrustedTypePolicy.prototype.createScriptURL;
    TrustedTypePolicy.prototype.createScriptURL = function (input, ...args) {
      return origCreate.call(this, rewriteUrl(input), ...args);
    };
  }

  const srcDesc = Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, "src");
  if (srcDesc && srcDesc.set) {
    Object.defineProperty(HTMLIFrameElement.prototype, "src", {
      ...srcDesc,
      set(v) {
        if (typeof v === "string") v = rewriteUrl(v);
        return srcDesc.set.call(this, v);
      }
    });
  }
  const origSetAttr = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function (name, val) {
    if (this instanceof HTMLIFrameElement && String(name).toLowerCase() === "src") val = rewriteUrl(String(val));
    return origSetAttr.call(this, name, val);
  };

  /* ---------- استقبال الإعدادات ---------- */
  function applyLayer(layer) {
    const cfg = makeCfg(layer);
    currentTest = cfg ? Object.assign({ layer: layer }, cfg) : null;
    window.__GAPT_READY = true;
    window.__GAPT_STATE = { layer: layer || "off", mounted: !!currentTest };
    refreshBadge();
    try {
      window.postMessage({ __gapt: 1, type: "state", state: window.__GAPT_STATE }, "*");
    } catch (e) {}
  }

  window.addEventListener("message", (ev) => {
    const d = ev.data;
    if (!d || d.__gapt !== 1) return;
    if (d.type === "cfg") applyLayer(d.layer);
    if (d.type === "ping") {
      try {
        window.postMessage({ __gapt: 1, type: "state", state: window.__GAPT_STATE || { layer: "off", mounted: false } }, "*");
      } catch (e) {}
    }
  });

  // القراءة الأولية
  const attrCfg = document.documentElement.getAttribute("data-gapt-layer");
  applyLayer(attrCfg || "off");
  document.addEventListener("DOMContentLoaded", refreshBadge);
})();
