/* =========================================================
   Kingswell Assessment Normalizer
   Makes radio/checkbox answers readable and fully clickable
   across root site + standalone curriculum modules.
   ========================================================= */

(() => {
  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const enhancedForms = new WeakMap();
  let scheduled = false;

  function cssSafe(value) {
    if (window.CSS && CSS.escape) return CSS.escape(value);
    return String(value).replace(/[^a-zA-Z0-9_-]/g, "\\$&");
  }

  function getLetter(index) {
    return LETTERS[index] || String(index + 1);
  }

  function textFromLabel(label, input) {
    const clone = label.cloneNode(true);
    clone.querySelectorAll("input, .choice-letter, .kwa-choice-letter").forEach(node => node.remove());
    return clone.textContent.replace(/\s+/g, " ").trim();
  }

  function clearLooseText(label, input) {
    [...label.childNodes].forEach(node => {
      if (node === input) return;
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) node.remove();
    });
  }

  function ensureLabel(input) {
    if (!input.id) {
      input.id = `kwa-choice-${Math.random().toString(36).slice(2, 10)}`;
    }

    let label = input.closest("label");
    if (!label) label = document.querySelector(`label[for="${cssSafe(input.id)}"]`);
    if (!label) {
      const wrapper = input.closest(".choice, .option-label, .answer-option, .choice-card, li, div");
      if (!wrapper) return null;

      label = document.createElement("label");
      label.className = wrapper.className || "kwa-choice-card";

      while (wrapper.firstChild) label.appendChild(wrapper.firstChild);
      wrapper.appendChild(label);
    }

    if (!label.getAttribute("for")) label.setAttribute("for", input.id);
    return label;
  }

  function formSignature(inputs) {
    return inputs.map((input, index) => [
      index,
      input.type,
      input.name,
      input.id,
      input.value,
      input.closest("label")?.textContent.replace(/\s+/g, " ").trim()
    ].join("|")).join("::");
  }

  function enhanceGroup(inputs) {
    inputs.forEach((input, index) => {
      const label = ensureLabel(input);
      if (!label) return;

      const letter = getLetter(index);
      const answerText = textFromLabel(label, input).replace(/^[A-Z]\.\s*/i, "").trim();

      label.classList.add("kwa-choice-card");

      let letterBadge = label.querySelector(".choice-letter, .kwa-choice-letter");
      if (!letterBadge) {
        letterBadge = document.createElement("span");
        letterBadge.className = "kwa-choice-letter";
        letterBadge.textContent = letter;
        input.insertAdjacentElement("afterend", letterBadge);
      } else {
        letterBadge.textContent = letter;
      }

      let copy = label.querySelector(".choice-copy, .kwa-choice-copy");
      if (!copy) {
        copy = document.createElement("span");
        copy.className = "kwa-choice-copy";
        copy.innerHTML = `<strong>${letter}.</strong> <span></span>`;
        label.appendChild(copy);
      }

      const textSpan = copy.querySelector("span") || copy;
      if (answerText) textSpan.textContent = answerText;

      clearLooseText(label, input);
      label.classList.toggle("selected", input.checked);
    });
  }

  function enhanceForm(form) {
    if (!form) return;

    const inputs = [...form.querySelectorAll('input[type="radio"], input[type="checkbox"]')];
    if (!inputs.length) return;

    const signature = formSignature(inputs);
    if (enhancedForms.get(form) === signature) return;

    form.classList.add("kwa-assessment-form");

    const groups = new Map();
    inputs.forEach(input => {
      const key = input.name || input.id || Math.random().toString(36);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(input);
    });

    groups.forEach(group => enhanceGroup(group));
    enhancedForms.set(form, formSignature(inputs));
  }

  function enhanceAll() {
    document.querySelectorAll("form").forEach(enhanceForm);
  }

  function scheduleEnhance() {
    if (scheduled) return;
    scheduled = true;
    const run = () => {
      scheduled = false;
      enhanceAll();
    };
    if (window.requestAnimationFrame) window.requestAnimationFrame(run);
    else window.setTimeout(run, 0);
  }

  document.addEventListener("change", event => {
    const input = event.target.closest?.('input[type="radio"], input[type="checkbox"]');
    if (!input) return;

    const scope = input.closest("form") || document;
    if (!input.name) return;

    scope.querySelectorAll(`input[name="${cssSafe(input.name)}"]`).forEach(item => {
      item.closest("label")?.classList.toggle("selected", item.checked);
    });
  });

  document.addEventListener("DOMContentLoaded", enhanceAll);

  new MutationObserver(scheduleEnhance).observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
