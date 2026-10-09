import { useState } from "react";

import { IconBrand } from "../../components/Icons";
import "./portfolio.css";

type ProjectCategory = "all" | "residencial" | "terreno" | "comunidad";

interface ShowcaseProject {
  name: string;
  location: string;
  category: Exclude<ProjectCategory, "all">;
  categoryLabel: string;
  size: string;
  description: string;
  image: string;
  imageAlt: string;
}

const inquiryEmail = "mujeebsikiru17@gmail.com";

const projects: ShowcaseProject[] = [
  {
    name: "Reserva Norte",
    location: "Concepto residencial",
    category: "residencial",
    categoryLabel: "Residencial",
    size: "Lotes desde 300 m²",
    description: "Un entorno abierto, pensado para construir con espacio alrededor.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1100&q=85",
    imageAlt: "Casa contemporánea rodeada de jardín y árboles",
  },
  {
    name: "Lomas del Río",
    location: "Concepto de terrenos",
    category: "terreno",
    categoryLabel: "Terrenos",
    size: "Parcelas desde 500 m²",
    description: "Tierra amplia y paisaje natural para imaginar nuevos comienzos.",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1100&q=85",
    imageAlt: "Laderas verdes y campos abiertos bajo el cielo",
  },
  {
    name: "Senderos Verdes",
    location: "Concepto de comunidad",
    category: "comunidad",
    categoryLabel: "Comunidad",
    size: "Diseño de baja densidad",
    description: "Calles tranquilas y áreas verdes como parte de la vida diaria.",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1100&q=85",
    imageAlt: "Casa contemporánea rodeada de jardín",
  },
];

const categories: Array<{ id: ProjectCategory; label: string }> = [
  { id: "all", label: "Todos" },
  { id: "residencial", label: "Residencial" },
  { id: "terreno", label: "Terrenos" },
  { id: "comunidad", label: "Comunidad" },
];

function inquiryLink(projectName?: string): string {
  const subject = projectName ? `Consulta sobre ${projectName}` : "Consulta de proyectos Lindero";
  const body = projectName ? `Hola, quisiera conocer más sobre ${projectName}.` : "Hola, quisiera conocer más sobre sus proyectos.";
  return `mailto:${inquiryEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function PortfolioPage() {
  const [category, setCategory] = useState<ProjectCategory>("all");
  const visibleProjects = category === "all" ? projects : projects.filter((project) => project.category === category);

  return (
    <main className="portfolio">
      <header className="portfolio-header">
        <a className="portfolio-brand" href="#inicio" aria-label="Lindero, inicio">
          <span className="portfolio-brand-mark"><IconBrand /></span>
          <span>Lindero</span>
        </a>
        <nav className="portfolio-nav" aria-label="Navegación principal">
          <a href="#proyectos">Proyectos</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <a className="portfolio-management-link" href="/gestion">Gestión interna <span aria-hidden="true">↗</span></a>
      </header>

      <section className="portfolio-hero" id="inicio">
        <div className="portfolio-hero-image" role="img" aria-label="Paisaje verde de terreno abierto" />
        <div className="portfolio-hero-content">
          <p className="portfolio-eyebrow"><span /> Espacios para lo que viene</p>
          <h1>Un buen lugar<br />cambia todo.</h1>
          <p className="portfolio-hero-copy">
            Descubre ideas de proyectos de terrenos y comunidades pensadas para crecer a tu manera.
          </p>
          <div className="portfolio-hero-actions">
            <a className="portfolio-button portfolio-button-light" href="#proyectos">Explorar proyectos <span aria-hidden="true">↓</span></a>
            <a className="portfolio-text-link portfolio-text-link-light" href={inquiryLink()}>Hablemos de tu próximo paso <span aria-hidden="true">↗</span></a>
          </div>
          <span className="portfolio-hero-index">01 / 03</span>
        </div>
        <p className="portfolio-image-credit">Paisaje de referencia · Imagen ilustrativa</p>
      </section>

      <section className="portfolio-intro" id="nosotros">
        <p className="portfolio-kicker">LINDERO <span>/</span> TIERRA CON POSIBILIDADES</p>
        <div className="portfolio-intro-copy">
          <h2>El comienzo de algo propio.</h2>
          <p>
            Cada terreno abre una posibilidad distinta. Reunimos conceptos de espacios residenciales,
            parcelas y comunidades para que encuentres una idea que se sienta tuya.
          </p>
        </div>
        <a className="portfolio-round-link" href="#proyectos" aria-label="Ver proyectos">↓</a>
      </section>

      <section className="portfolio-projects" id="proyectos">
        <div className="portfolio-section-heading">
          <div>
            <p className="portfolio-kicker">UNA MIRADA A LINDERO</p>
            <h2>Proyectos destacados</h2>
          </div>
          <p>Ideas para vivir, invertir y construir con intención.</p>
        </div>

        <div className="portfolio-filters" role="group" aria-label="Filtrar proyectos">
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              className={category === item.id ? "portfolio-filter active" : "portfolio-filter"}
              aria-pressed={category === item.id}
              onClick={() => setCategory(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="portfolio-project-grid" aria-live="polite">
          {visibleProjects.map((project, index) => (
            <article className="portfolio-project" key={project.name}>
              <a className="portfolio-project-image" href={inquiryLink(project.name)} aria-label={`Consultar sobre ${project.name}`}>
                <img src={project.image} alt={project.imageAlt} loading="lazy" />
                <span className="portfolio-project-number">0{index + 1}</span>
                <span className="portfolio-project-arrow" aria-hidden="true">↗</span>
              </a>
              <div className="portfolio-project-meta">
                <span>{project.categoryLabel}</span>
                <span className="portfolio-demo-tag">Proyecto de muestra</span>
              </div>
              <h3>{project.name}</h3>
              <p className="portfolio-project-location">{project.location} <span>·</span> {project.size}</p>
              <p className="portfolio-project-description">{project.description}</p>
              <a className="portfolio-text-link" href={inquiryLink(project.name)}>Consultar proyecto <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
        <p className="portfolio-demo-note">Los nombres, imágenes y detalles de esta sección son contenido de muestra.</p>
      </section>

      <section className="portfolio-contact" id="contacto">
        <div>
          <p className="portfolio-kicker">EL PRÓXIMO PASO</p>
          <h2>¿Hablamos de terreno?</h2>
          <p>Cuéntanos qué tienes en mente. Te responderemos por correo.</p>
        </div>
        <a className="portfolio-button portfolio-button-dark" href={inquiryLink()}>Escribir a Lindero <span aria-hidden="true">↗</span></a>
      </section>

      <footer className="portfolio-footer">
        <a className="portfolio-brand" href="#inicio" aria-label="Lindero, volver al inicio">
          <span className="portfolio-brand-mark"><IconBrand /></span>
          <span>Lindero</span>
        </a>
        <span>© {new Date().getFullYear()} Lindero</span>
        <a href="/gestion">Panel de gestión <span aria-hidden="true">↗</span></a>
      </footer>
    </main>
  );
}