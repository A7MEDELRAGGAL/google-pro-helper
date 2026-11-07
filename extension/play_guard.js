/* Free Zoot · Google AI Pro Offer Injector — حارس أسعار نافذة الدفع
 * الوظيفة: فحص شروط الدفع داخل نافذة Google Play؛ الشريط الأخضر = تجربة مجانية آمنة، الأحمر = سيتم خصم أموال.
 * وعند الضغط على اشتراك أو إتمام الاشتراك يفتح قناة التليجرام الخاصة بنا ويعرض زر انضم إلينا.
 */
(() => {
  if (window.__GAPT_GUARD || window.top === window) return; // يعمل داخل الإطار الفرعي فقط
  window.__GAPT_GUARD = true;

  const TG_URL = "https://t.me/Free_Zoot_Dis";
  const FREE_WORDS = [
    "free trial", "start your free trial", "免费试用", "تجربة مجانية", "فترة تجريبية مجانية", "مجانًا", "مجانا",
    "US$0.00", "$0.00", "0,00", "€0.00", "won't be charged", "不会向您收费", "不会收费", "لن يتم تحصيل", "بدون رسوم"
  ];
  const PAID_WORDS = [
    "/mo after", "/month after", "per month after", "立即付款", "pay now", "今日扣款", "charged today", "الدفع الآن"
  ];
  const SUB_BTN_WORDS = ["subscribe", "订阅", "اشترك", "اشتراك"];
  const DONE_WORDS = [
    "subscribed", "已订阅", "感谢您订阅", "تم الاشتراك", "شكرًا لك على الاشتراك",
    "play points", "google play 积分", "نقاط google play", "backup payment", "备用付款方式", "طريقة دفع احتياطية"
  ];

  let bar = null;
  let msgSpan = null;
  let openedTelegram = false;

  function openOurTelegram() {
    if (openedTelegram) return;
    openedTelegram = true;
    try {
      window.open(TG_URL, "_blank", "noopener,noreferrer");
    } catch (e) {}
  }

  function paint(kind, text) {
    if (!document.body) return;
    if (!bar) {
      bar = document.createElement("div");
      bar.dir = "rtl";
      bar.style.cssText = "position:fixed;left:0;right:0;top:0;z-index:2147483647;padding:8px 14px;" +
        "font:13px/1.5 'Segoe UI',Tahoma,Roboto,sans-serif;text-align:center;font-weight:700;" +
        "display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;box-shadow:0 2px 8px rgba(0,0,0,.2);";
      msgSpan = document.createElement("span");
      const joinLink = document.createElement("a");
      joinLink.href = TG_URL;
      joinLink.target = "_blank";
      joinLink.rel = "noopener noreferrer";
      joinLink.textContent = "✈️ انضم إلينا (@Free_Zoot_Dis)";
      joinLink.style.cssText = "background:#fff;color:#1d2c47;padding:3px 10px;border-radius:999px;font-size:11.5px;text-decoration:none;font-weight:700;";
      bar.appendChild(msgSpan);
      bar.appendChild(joinLink);
      document.body.appendChild(bar);
    }
    bar.style.background = kind === "ok" ? "#1a7f37" : (kind === "bad" ? "#c62828" : "#616161");
    bar.style.color = "#fff";
    msgSpan.textContent = text;
  }

  function judge() {
    let t = "";
    try {
      t = (document.body && document.body.innerText || "").toLowerCase();
    } catch (e) {
      return;
    }
    if (!t || t.length < 5) return;

    if (DONE_WORDS.some((w) => t.includes(w.toLowerCase()))) {
      paint("ok", "🎉 تم الاشتراك بنجاح! لا تنسَ الانضمام إلى قناتنا على التليجرام:");
      openOurTelegram();
      return;
    }

    const free = FREE_WORDS.some((w) => t.includes(w.toLowerCase()));
    const paid = PAID_WORDS.some((w) => t.includes(w.toLowerCase()));

    if (free && !paid) {
      paint("ok", "✅ تم اكتشاف تجربة مجانية ($0.00) —— يمكنك الاشتراك بأمان الآن!");
    } else if (paid && !free) {
      paint("bad", "❌ لم يتم اكتشاف تجربة مجانية (قد يتم خصم أموال) —— لا تضغط اشتراك وغيّر المرحلة!");
    } else if (free && paid) {
      paint("warn", "⚠️ تظهر عبارات مجانية ومدفوعة معاً —— يرجى التأكد يدوياً أن المبلغ $0.00 قبل الاشتراك");
    } else {
      paint("warn", "⏳ جاري فحص شروط السعر في نافذة الدفع...");
    }
  }

  // عند الضغط على زر "اشتراك / Subscribe" يتم فتح قناة التليجرام تلقائياً
  document.addEventListener("click", (ev) => {
    try {
      const btn = ev.target && ev.target.closest && ev.target.closest('button, [role="button"]');
      if (!btn) return;
      const txt = (btn.innerText || "").trim().toLowerCase();
      if (SUB_BTN_WORDS.some((w) => txt === w || txt.includes(w))) {
        setTimeout(openOurTelegram, 800);
      }
    } catch (e) {}
  }, true);

  setTimeout(judge, 1200);
  setTimeout(judge, 3000);
  setTimeout(judge, 6000);
  try {
    const mo = new MutationObserver(() => judge());
    document.addEventListener("DOMContentLoaded", () => mo.observe(document.body, { childList: true, subtree: true, characterData: true }));
  } catch (e) {}
})();
