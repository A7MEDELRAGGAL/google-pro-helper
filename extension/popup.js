/* popup.js - Free Zoot (@Free_Zoot_Dis) */
const LABELS = {
  off: "غير مفعّل",
  "12m": "12 شهراً (المرحلة الأولى)",
  "6m_ss": "6 أشهر (SS - المرحلة الثانية)",
  "6m": "6 أشهر (المرحلة الثالثة)",
  "6m_2": "6 أشهر (احتياطي)"
};
const stateEl = document.getElementById("state");

function paintState(st) {
  const layer = (st && st.layer) || "off";
  const mounted = !!(st && st.mounted) && layer !== "off";
  stateEl.className = mounted ? "ok" : "warn";
  stateEl.textContent = mounted
    ? "✅ تم التفعيل: " + (LABELS[layer] || layer) + " —— يمكنك الآن الضغط على زر العرض (Get discount)"
    : "⚠️ لم يتم اكتشاف الحقن في الصفحة الحالية (تأكد من فتح one.google.com/plans وتحديث الصفحة)";
}

function queryTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const t = tabs && tabs[0];
    if (!t) return paintState(null);
    chrome.tabs.sendMessage(t.id, { type: "getState" }, (resp) => {
      if (chrome.runtime.lastError || !resp) return paintState(null);
      paintState(resp);
    });
  });
}

chrome.storage.local.get(["gapt_layer"], (r) => {
  const layer = (r && r.gapt_layer) || "off";
  document.querySelectorAll('input[name="layer"]').forEach((el) => {
    el.checked = el.value === layer;
    el.addEventListener("change", () => {
      if (!el.checked) return;
      chrome.storage.local.set({ gapt_layer: el.value }, () => {
        // تحديث فوري للتبويب النشط
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const t = tabs && tabs[0];
          if (!t) return queryTab();
          chrome.tabs.sendMessage(t.id, { type: "setLayer", layer: el.value }, () => {
            void chrome.runtime.lastError;
            setTimeout(queryTab, 350);
          });
        });
      });
    });
  });
  queryTab();
  setTimeout(queryTab, 800);
});

setInterval(queryTab, 1500);
