"use strict";
const rules = [
    {
        id: 1,
        cat: "HTML",
        priority: "High",
        title: "Document has a unique page title",
        help: "Use a concise title that describes this page.",
    },
    {
        id: 2,
        cat: "HTML",
        priority: "Normal",
        title: "Heading hierarchy stays logical",
        help: "Start with one h1 and avoid skipping heading levels.",
    },
    {
        id: 3,
        cat: "Accessibility",
        priority: "Critical",
        title: "Interactive controls have names",
        help: "Add visible labels or an accessible name.",
    },
    {
        id: 4,
        cat: "Accessibility",
        priority: "High",
        title: "Keyboard focus is clearly visible",
        help: "Never remove outlines without a strong replacement.",
    },
    {
        id: 5,
        cat: "Performance",
        priority: "High",
        title: "Images are sized and lazy-loaded",
        help: "Set dimensions and defer images below the fold.",
    },
    {
        id: 6,
        cat: "Performance",
        priority: "Normal",
        title: "JavaScript work is intentionally limited",
        help: "Remove unused code and split expensive work.",
    },
    {
        id: 7,
        cat: "SEO",
        priority: "High",
        title: "Meta description explains the page",
        help: "Write a useful description for search previews.",
    },
    {
        id: 8,
        cat: "SEO",
        priority: "Normal",
        title: "Canonical URL is intentional",
        help: "Declare the preferred URL when duplicates can exist.",
    },
    {
        id: 9,
        cat: "Security",
        priority: "Critical",
        title: "External links are protected",
        help: "Use rel=noreferrer on untrusted new-tab links.",
    },
    {
        id: 10,
        cat: "Responsive",
        priority: "High",
        title: "Layout works at 320px",
        help: "Test overflow, tap targets and readable type.",
    },
    {
        id: 11,
        cat: "Responsive",
        priority: "Normal",
        title: "Motion respects user preference",
        help: "Use prefers-reduced-motion for nonessential animation.",
    },
    {
        id: 12,
        cat: "Security",
        priority: "High",
        title: "No secrets exist in client code",
        help: "Keep tokens and private keys on a server.",
    },
];
rules.push({
    id: 13,
    cat: "HTML",
    priority: "High",
    title: "Language is declared on the document",
    help: "Set the html lang attribute for pronunciation and translation.",
}, {
    id: 14,
    cat: "HTML",
    priority: "Normal",
    title: "Buttons use the correct type",
    help: "Use type=button unless the control should submit a form.",
}, {
    id: 15,
    cat: "Accessibility",
    priority: "Critical",
    title: "Images have purposeful alternatives",
    help: "Describe informative images and use empty alt for decorative ones.",
}, {
    id: 16,
    cat: "Accessibility",
    priority: "High",
    title: "Colour is not the only signal",
    help: "Pair colour with text, icons or patterns for status and errors.",
}, {
    id: 17,
    cat: "Accessibility",
    priority: "High",
    title: "Form errors are announced and specific",
    help: "Connect clear error text to its field with aria-describedby.",
}, {
    id: 18,
    cat: "Performance",
    priority: "High",
    title: "Fonts use an efficient loading strategy",
    help: "Preload only critical fonts and use font-display swap.",
}, {
    id: 19,
    cat: "Performance",
    priority: "Normal",
    title: "Animations avoid layout properties",
    help: "Prefer transform and opacity to reduce layout and paint work.",
}, {
    id: 20,
    cat: "Performance",
    priority: "High",
    title: "Critical content renders without JavaScript",
    help: "Keep essential navigation and information resilient.",
}, {
    id: 21,
    cat: "SEO",
    priority: "High",
    title: "Social sharing metadata is present",
    help: "Provide intentional title, description and image metadata.",
}, {
    id: 22,
    cat: "SEO",
    priority: "Normal",
    title: "Structured data matches visible content",
    help: "Use valid schema only for information users can see.",
}, {
    id: 23,
    cat: "Security",
    priority: "Critical",
    title: "User content is never injected as raw HTML",
    help: "Escape or sanitize untrusted content before rendering.",
}, {
    id: 24,
    cat: "Security",
    priority: "High",
    title: "Forms include server-side validation",
    help: "Client validation improves UX but cannot enforce trust.",
}, {
    id: 25,
    cat: "Security",
    priority: "Normal",
    title: "Permissions are requested in context",
    help: "Ask for camera, location or notifications only after intent.",
}, {
    id: 26,
    cat: "Responsive",
    priority: "High",
    title: "Tap targets are comfortably sized",
    help: "Aim for at least 44 by 44 CSS pixels around important actions.",
}, {
    id: 27,
    cat: "Responsive",
    priority: "Normal",
    title: "Text zoom does not break layout",
    help: "Test at 200% zoom and avoid fixed-height text containers.",
}, {
    id: 28,
    cat: "UX",
    priority: "High",
    title: "Loading, empty and error states exist",
    help: "Every data view should explain waiting, absence and failure.",
}, {
    id: 29,
    cat: "UX",
    priority: "High",
    title: "Destructive actions require intent",
    help: "Confirm irreversible actions or provide a reliable undo.",
}, {
    id: 30,
    cat: "UX",
    priority: "Normal",
    title: "Success feedback is clear and brief",
    help: "Confirm completion near the action without blocking the workflow.",
});
const byId = (id) => document.getElementById(id);
let state = JSON.parse(localStorage.getItem("fqi-state") || "{}");
const list = byId("list"), search = byId("search"), category = byId("category"), priority = byId("priority");
[...new Set(rules.map((r) => r.cat))].forEach((c) => category.add(new Option(c, c)));
function save() {
    localStorage.setItem("fqi-state", JSON.stringify(state));
}
function update() {
    const q = search.value.toLowerCase();
    const filtered = rules.filter((r) => (category.value === "all" || r.cat === category.value) &&
        (priority.value === "all" || r.priority === priority.value) &&
        (r.title + " " + r.help).toLowerCase().includes(q));
    list.innerHTML =
        filtered
            .map((r) => `<article class="check" data-state="${state[r.id] || ""}"><span class="pill">${r.cat} · ${r.priority}</span><div><h3>${r.title}</h3><p>${r.help}</p></div><div class="actions"><button class="pass ${state[r.id] === "pass" ? "active" : ""}" data-id="${r.id}" data-state="pass" title="Pass">✓</button><button class="fail ${state[r.id] === "fail" ? "active" : ""}" data-id="${r.id}" data-state="fail" title="Needs work">×</button></div></article>`)
            .join("") || "<p>No matching checks.</p>";
    document.querySelectorAll(".actions button").forEach((b) => (b.onclick = () => {
        const id = Number(b.dataset.id), next = b.dataset.state;
        state[id] = state[id] === next ? "" : next;
        save();
        update();
    }));
    const pass = rules.filter((r) => state[r.id] === "pass").length, fail = rules.filter((r) => state[r.id] === "fail").length;
    byId("passed").textContent = String(pass);
    byId("failed").textContent = String(fail);
    byId("remaining").textContent = String(rules.length - pass - fail);
    byId("visible").textContent = String(filtered.length);
    byId("score").textContent = String(Math.round((pass / rules.length) * 100));
}
search.oninput = update;
category.onchange = update;
priority.onchange = update;
byId("resetBtn").onclick = () => {
    state = {};
    save();
    update();
};
byId("exportBtn").onclick = () => {
    const lines = [
        "Frontend Quality Inspector — Sudesh Mehar",
        "",
        ...rules.map((r) => `[${state[r.id] === "pass" ? "PASS" : state[r.id] === "fail" ? "FIX" : "TODO"}] ${r.cat}: ${r.title}`),
    ];
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([lines.join("\n")], { type: "text/plain" }));
    a.download = "frontend-audit.txt";
    a.click();
    URL.revokeObjectURL(a.href);
};
update();
