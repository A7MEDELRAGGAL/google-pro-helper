/* Free Zoot · Google AI Pro Offer Injector — content script (نقل الإعدادات والحالة) */
(() => {
  let lastState = { layer: "off", mounted: false };

  function push(layer) {
    try {
      document.documentElement.setAttribute("data-gapt-layer", layer || "off");
    } catch (e) {}
    window.postMessage({ __gapt: 1, type: "cfg", layer: layer || "off" }, "*");
  }

  function loadAndPush() {
    try {
      chrome.storage.local.get(["gapt_layer"], (r) => push(r && r.gapt_layer ? r.gapt_layer : "12m"));
    } catch (e) {
      push("12m");
    }
  }

  // استقبال الحالة من MAIN world
  window.addEventListener("message", (ev) => {
    const d = ev.data;
    if (d && d.__gapt === 1 && d.type === "state" && d.state) lastState = d.state;
  });

  // استعلام الحالة من النافذة المنبثقة أو التحديث الفوري عند تغيير الإعدادات
  try {
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
      if (!msg) return;
      if (msg.type === "getState") {
        window.postMessage({ __gapt: 1, type: "ping" }, "*");
        setTimeout(() => sendResponse(lastState), 150);
        return true;
      }
      if (msg.type === "setLayer") {
        push(msg.layer);
        setTimeout(() => sendResponse({ ok: true, state: lastState }), 150);
        return true;
      }
    });
    chrome.storage.onChanged.addListener((ch) => {
      if (ch && ch.gapt_layer) push(ch.gapt_layer.newValue || "off");
    });
  } catch (e) {}

  loadAndPush();
  // إعادة الإرسال بعد تنقلات SPA لضمان التفعيل
  setTimeout(loadAndPush, 800);
  setTimeout(loadAndPush, 2500);
})();
