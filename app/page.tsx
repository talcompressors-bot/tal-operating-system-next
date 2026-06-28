import Link from "next/link";

const modules = [
  {
    title: "Operations Center",
    description: "Daily workspace for blockers, ownership, readiness, and next actions.",
    href: "/operations",
    active: true,
  },
  {
    title: "דוחות שירות",
    description: "צפייה בדוחות טכנאים, פרטי לקוח וציוד מטופל.",
    href: "/service-reports",
    active: true,
  },
  {
    title: "מסמכים עסקיים",
    description: "Read-only business document draft shell for approval and Maven lifecycle.",
    href: "/business-documents",
    active: true,
  },
  {
    title: "לקוחות",
    description: "כרטיסי לקוח, פרטי קשר והיסטוריית שירות.",
    href: "/customers",
    active: true,
  },
  {
    title: "ציוד / מלאי",
    description: "ציוד, חלקים, מלאי והתאמת מקטים.",
    href: "/equipment",
    active: true,
  },
  {
    title: "Parts Used",
    description: "Read-only parts usage linked to reports and product records.",
    href: "/parts-used",
    active: true,
  },
  {
    title: "טיוטות AI",
    description: "Read-only AI draft suggestions shell for future approval and Maven lifecycle.",
    href: "/ai-drafts",
    active: true,
  },
  {
    title: "Automation Commands",
    description: "Read-only command queue shell for lifecycle and external target tracking.",
    href: "/automation-commands",
    active: true,
  },
];

export default function HomePage() {
  return (
    <section className="page-shell">
      <div>
        <p className="eyebrow">מערכת ההפעלה של טל</p>
        <h1>לוח בקרה תפעולי</h1>
        <p className="lede">
          גרסת פיתוח ראשונה עם נתוני דוגמה בלבד. דוחות שירות הוא המודול הפעיל
          לקריאה בלבד.
        </p>
      </div>

      <div className="module-grid">
        {modules.map((module) => {
          const card = (
            <article className={module.active ? "module-card active" : "module-card"}>
              <div>
                <h2>{module.title}</h2>
                <p>{module.description}</p>
              </div>
              <span>{module.active ? "פתיחה" : "בקרוב"}</span>
            </article>
          );

          return module.active ? (
            <Link key={module.title} href={module.href}>
              {card}
            </Link>
          ) : (
            <div key={module.title} aria-disabled="true">
              {card}
            </div>
          );
        })}
      </div>
    </section>
  );
}
