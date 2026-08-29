import jsPDF from "jspdf";
import { experience } from "../data/experience";
import { projects } from "../data/projects";

export function generateCV() {
  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentW = pageW - margin * 2;

  // Colors — warm dark tokens adapted for print (light paper)
  const bg = { r: 247, g: 245, b: 242 }; // #f7f5f2 off-white (light mode per Design)
  const textPrimary = { r: 26, g: 25, b: 24 }; // charcoal
  const textSecondary = { r: 107, g: 102, b: 96 }; // #6b6660 muted
  const textMuted = { r: 154, g: 149, b: 144 }; // #9a9590
  const accent = { r: 194, g: 120, b: 92 }; // #c2785c
  const border = { r: 229, g: 227, b: 223 };

  // Background
  doc.setFillColor(bg.r, bg.g, bg.b);
  doc.rect(0, 0, pageW, pageH, "F");

  let y = margin;

  // Header — name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(textPrimary.r, textPrimary.g, textPrimary.b);
  doc.text("Abdulazeez Badmus", margin, y);
  y += 7;

  // Role
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(textSecondary.r, textSecondary.g, textSecondary.b);
  doc.text("React Developer  ·  Full Stack Engineer  ·  Abu Abdirrahman", margin, y);
  y += 4;

  // Tagline with accent dot
  doc.setFillColor(accent.r, accent.g, accent.b);
  doc.circle(margin + 1.2, y - 1.2, 1, "F");
  doc.setFontSize(7.5);
  doc.setTextColor(textMuted.r, textMuted.g, textMuted.b);
  // Use a simple sans for the dot line — jsPDF helvetica
  doc.text("Building products that serve communities.  ·  Currently: React Dev @ Manaknight", margin + 4, y);
  y += 5;

  // Divider
  doc.setDrawColor(border.r, border.g, border.b);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageW - margin, y);
  y += 6;

  // Contact row
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(textSecondary.r, textSecondary.g, textSecondary.b);
  const contacts = [
    "abdulazeezadekiilekun@gmail.com",
    "github.com/abuAbdur-rahman",
    "linkedin.com/in/abdulazeez-badmus",
    "Ilorin, Nigeria",
  ];
  doc.text(contacts.join("   ·   "), margin, y);
  y += 8;

  // Helper to check page break
  const needSpace = (h: number) => {
    if (y + h > pageH - margin) {
      doc.addPage();
      doc.setFillColor(bg.r, bg.g, bg.b);
      doc.rect(0, 0, pageW, pageH, "F");
      y = margin;
    }
  };

  // Section title helper
  const sectionTitle = (title: string) => {
    needSpace(10);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(accent.r, accent.g, accent.b);
    doc.text(title.toUpperCase(), margin, y);
    // underline
    doc.setDrawColor(accent.r, accent.g, accent.b);
    doc.setLineWidth(0.4);
    doc.line(margin, y + 1.2, margin + doc.getTextWidth(title.toUpperCase()), y + 1.2);
    y += 6;
    doc.setFont("helvetica", "normal");
  };

  // Experience
  sectionTitle("Experience");
  for (const exp of experience) {
    needSpace(12);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(textPrimary.r, textPrimary.g, textPrimary.b);
    doc.text(`${exp.role} — ${exp.company}`, margin, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(textMuted.r, textMuted.g, textMuted.b);
    doc.text(exp.period, pageW - margin - doc.getTextWidth(exp.period), y);
    y += 3.5;
    if (exp.description) {
      doc.setFontSize(7);
      doc.setTextColor(textSecondary.r, textSecondary.g, textSecondary.b);
      const lines = doc.splitTextToSize(exp.description, contentW - 4);
      doc.text(lines, margin + 2, y);
      y += lines.length * 3.2 + 1;
    }
    y += 1.5;
  }

  // Projects — featured + one-liners
  sectionTitle("Selected Work");
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured).slice(0, 4);
  const all = [...featured, ...others];
  for (const p of all) {
    needSpace(10);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(textPrimary.r, textPrimary.g, textPrimary.b);
    doc.text(`${p.number} / ${p.title} — ${p.label.toLowerCase()}`, margin, y);
    // status
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6);
    const status = p.status === "live" ? "Live" : "In Progress";
    const statusW = doc.getTextWidth(status);
    doc.setTextColor(status === "Live" ? 124 : accent.r, status === "Live" ? 154 : accent.g, status === "Live" ? 107 : accent.b);
    doc.text(status, pageW - margin - statusW, y);
    y += 3.2;
    doc.setFontSize(7);
    doc.setTextColor(textSecondary.r, textSecondary.g, textSecondary.b);
    const lines = doc.splitTextToSize(p.tagline, contentW - 4);
    doc.text(lines, margin + 2, y);
    y += lines.length * 3.2 + 1;
    doc.setFontSize(6);
    doc.setTextColor(textMuted.r, textMuted.g, textMuted.b);
    doc.text(p.tech.join(" · "), margin + 2, y);
    y += 5;
  }

  // Skills
  sectionTitle("Stack");
  needSpace(12);
  doc.setFontSize(7);
  doc.setTextColor(textSecondary.r, textSecondary.g, textSecondary.b);
  const stack =
    "React · Next.js · TypeScript · Tailwind · Supabase · Firebase · Drizzle ORM · Rust · Axum · Tauri · Node.js · PostgreSQL · Git · Vercel · PWA · Monaco · WSL2";
  const stackLines = doc.splitTextToSize(stack, contentW);
  doc.text(stackLines, margin, y);
  y += stackLines.length * 3.2 + 4;

  doc.setFontSize(6.5);
  doc.setTextColor(textMuted.r, textMuted.g, textMuted.b);
  doc.text("Currently learning: Rust internals (smart pointers, async) · System design", margin, y);

  // Footer — page number + brand
  const footerY = pageH - 8;
  doc.setFontSize(6);
  doc.setTextColor(textMuted.r, textMuted.g, textMuted.b);
  doc.text("abdulazeez.dev  ·  abu ·", margin, footerY);
  doc.text(`Page 1`, pageW - margin - doc.getTextWidth("Page 1"), footerY);

  return doc;
}

export function downloadCV() {
  const doc = generateCV();
  doc.save("Abdulazeez-Badmus-CV.pdf");
}
