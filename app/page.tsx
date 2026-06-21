import Link from "next/link";

const modules = [
  {
    title: "Service Reports",
    description: "Browse technician service reports and equipment details.",
    href: "/service-reports",
    active: true,
  },
  {
    title: "Business Documents",
    description: "Quotes, invoices, and draft document workflow.",
    href: "#",
    active: false,
  },
  {
    title: "Customers",
    description: "Customer records, contact details, and service history.",
    href: "#",
    active: false,
  },
  {
    title: "Inventory",
    description: "Parts, stock levels, and SKU matching.",
    href: "#",
    active: false,
  },
  {
    title: "AI Drafts",
    description: "AI-assisted draft suggestions for service follow-up.",
    href: "#",
    active: false,
  },
];

export default function HomePage() {
  return (
    <section className="page-shell">
      <div>
        <p className="eyebrow">Tal Operating System</p>
        <h1>Operations dashboard</h1>
        <p className="lede">
          First visible version using mock data only. Service Reports is the
          active read-only module.
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
              <span>{module.active ? "Open" : "Coming soon"}</span>
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
