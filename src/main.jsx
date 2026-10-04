import React, {useState} from "react";
import {createRoot} from "react-dom/client";
import {
  ArrowUpRight,
  Download,
  Mail,
  Menu,
  X,
  Code2,
  GraduationCap,
  ExternalLink,
} from "lucide-react";
import {navigation, skillGroups, projects} from "./data/portfolio";
import "./index.css";

const container = "mx-auto w-[min(100%-2.5rem,1160px)]";
const section = "px-0 py-[var(--space-section)]";
const eyebrow =
  "m-0 mb-3 text-xs font-bold uppercase tracking-widest text-primary";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(27,36,64,.72)] bg-[rgba(5,7,17,.88)] backdrop-blur-2xl">
      <div
        className={`${container} flex min-h-18 items-center justify-between gap-8`}
      >
        <a
          className="font-title text-base font-semibold tracking-[-.02em]"
          href="#inicio"
          aria-label="Ir para o início"
        >
          CRIJOLISE
        </a>

        <button
          type="button"
          className="block border-0 bg-transparent p-1.5 text-text md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        <nav
          className={`
            items-center gap-6
            max-md:absolute max-md:left-0 max-md:right-0 max-md:top-18
            max-md:flex-col max-md:items-stretch max-md:gap-0
            max-md:border-b max-md:border-border
            max-md:bg-surface
            max-md:px-4 max-md:pb-4 max-md:pt-2
            ${open ? "max-md:flex" : "max-md:hidden"}
            md:flex
          `}
          aria-label="Navegação principal"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-sm text-text-muted transition-colors duration-150 hover:text-text max-md:py-2.5"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function SectionHeading({eyebrow: eyebrowText, title, children}) {
  return (
    <div className="mb-10 flex items-end justify-between gap-12 max-md:block">
      <div>
        <p className={eyebrow}>{eyebrowText}</p>

        <h2 className="m-0 font-title text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-.045em]">
          {title}
        </h2>
      </div>

      {children && (
        <p className="m-0 max-w-110 text-sm leading-6 text-text-muted max-md:mt-4">
          {children}
        </p>
      )}
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="mt-6 flex gap-2">
      <a
        href="#contactos"
        aria-label="Email"
        className="grid size-8 place-items-center rounded-sm border border-border text-text-muted transition-colors duration-150 hover:border-primary hover:text-primary"
      >
        <Mail size={14} />
      </a>

      <a
        href="#contactos"
        aria-label="LinkedIn"
        className="grid size-8 place-items-center rounded-sm border border-border text-text-muted transition-colors duration-150 hover:border-primary hover:text-primary"
      >
        <Code2 size={14} />
      </a>

      <a
        href="#contactos"
        aria-label="GitHub"
        className="grid size-8 place-items-center rounded-sm border border-border text-text-muted transition-colors duration-150 hover:border-primary hover:text-primary"
      >
        <Code2 size={14} />
      </a>
    </div>
  );
}

function ProjectCard({project}) {
  return (
    <article
      className={`
        overflow-hidden rounded-sm
        border border-border
        bg-card
        transition duration-300
        hover:-translate-y-1 hover:border-primary-soft
        ${project.featured ? "md:col-span-3 md:grid md:grid-cols-2" : ""}
      `}
    >
      <div
        className="
          relative flex min-h-45 items-center justify-center
          overflow-hidden p-4
          bg-[linear-gradient(135deg,#0d1326_46%,#1b1a3b_46%,#211d49_70%,#0d1326_70%)]
          max-sm:min-h-40
        "
      >
        <span className="absolute left-4 top-4 font-mono text-xs text-primary">
          {project.number}
        </span>

        <div className="w-[70%] border border-[#20284b] bg-[#080b16] p-4 shadow-[--shadow-card]">
          <div className="mb-5 flex gap-1.5">
            <i className="block size-1.25 rounded-full bg-primary" />
            <i className="block size-1.25 rounded-full bg-secondary opacity-70" />
            <i className="block size-1.25 rounded-full bg-text-faint" />
          </div>

          <span className="font-mono text-xs text-secondary">
            &lt;
            {project.title.replace(" ", "").toLowerCase()}
            /&gt;
          </span>
        </div>
      </div>

      <div className="p-[1.35rem]">
        <p className={eyebrow}>{project.category}</p>

        <h3 className="mb-3 font-title text-lg font-semibold leading-[1.05] tracking-[-.045em]">
          {project.title}
        </h3>

        <p className="mb-4 max-w-140 text-sm leading-6 text-text-muted">
          {project.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-border bg-transparent px-1.5 py-1 text-xs text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          className="inline-flex items-center gap-1.5 text-xs text-text-faint"
          href="#projetos"
          aria-disabled="true"
        >
          {project.linkLabel || "Ver projeto"}
          <ExternalLink size={14} />
        </a>
      </div>
    </article>
  );
}

function App() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section
          id="inicio"
          className={`${section} pt-[clamp(5rem,10vw,8rem)]`}
        >
          <div
            className={`${container} grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_.9fr] md:gap-16`}
          >
            <div className="text-center md:text-left">
              <p
                className="
                  mb-5 inline-flex items-center gap-2 rounded-full
                  border border-primary-soft
                  px-2.5 py-1.5
                  text-xs font-bold uppercase tracking-widest
                  text-primary
                "
              >
                <span className="mt-[.42rem] size-1.5 rounded-full bg-secondary" />
                Disponível para novas oportunidades
              </p>

              <h1 className="m-0 mt-5 font-title text-[clamp(2.8rem,7vw,5.4rem)] font-semibold leading-[1.05] tracking-[-.045em]">
                Crijolise
                <br />
                <em className="not-italic text-primary">Morglia Marçal</em>
              </h1>

              <p className="mb-3 mt-5 text-base text-text">
                Junior Full-Stack Developer
              </p>

              <p className="mx-auto max-w-140 text-sm leading-6 text-text-muted md:mx-0">
                Desenvolvo aplicações web com foco no frontend e no backend,
                combinando uma formação em Design Multimédia com aprendizagem
                prática em desenvolvimento web.
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <a
                  className="
                    inline-flex items-center gap-2 rounded-sm
                    bg-primary px-4 py-3
                    text-sm font-bold text-[#080611]
                    transition duration-150 hover:-translate-y-0.5
                  "
                  href="#projetos"
                >
                  Ver projetos
                  <ArrowUpRight size={14} />
                </a>

                <a
                  className="
                    inline-flex items-center gap-2 rounded-sm
                    border border-border
                    px-4 py-3 text-sm font-bold
                    transition duration-150 hover:-translate-y-0.5
                  "
                  href="#contactos"
                >
                  Contactar-me
                  <Mail size={14} />
                </a>

                <a
                  className="inline-flex items-center justify-center gap-1.5 text-sm text-text-muted"
                  href="#contactos"
                >
                  <Download size={14} />
                  Descarregar CV
                </a>
              </div>

              <div className="justify-center md:justify-start">
                <SocialLinks />
              </div>
            </div>

            <div className="relative mx-auto grid aspect-square w-full max-w-97.5 place-items-center max-md:order-first">
              <div className="absolute inset-[5%] rounded-full border border-primary-soft" />

              <div className="absolute inset-[3%] rotate-18 rounded-full border border-[rgba(154,124,255,.25)]" />

              <img
                src={`${import.meta.env.BASE_URL}querry.png`}
                alt="Retrato de Crijolise Morglia Marçal"
                className="h-[83%] w-[83%] rounded-full border-7 border-surface-soft object-cover grayscale-[.12]"
              />

              <div
                className="
                  absolute bottom-[13%] right-[-1%]
                  border border-border
                  bg-[#091126] px-3 py-2
                  font-mono text-xs text-secondary
                "
              >
                &lt;code exists /&gt;
                <strong className="block font-body text-xs text-text">
                  aprendendo a construir.
                </strong>
              </div>
            </div>
          </div>
        </section>

        {/* Sobre */}
        <section id="sobre" className={section}>
          <div
            className={`${container} grid grid-cols-1 gap-10 md:grid-cols-[.8fr_1.2fr] md:gap-16`}
          >
            <SectionHeading
              eyebrow="Sobre mim"
              title={
                <>
                  Design, código e
                  <br />
                  vontade de evoluir.
                </>
              }
            />

            <div className="flex flex-col gap-3.5">
              <p className="m-0 max-w-140 text-sm leading-6 text-text-muted">
                Sou de <span className="font-bold text-text">Timor-Leste</span>{" "}
                e estudei Design Multimédia em Coimbra. A minha formação deu-me
                uma base visual e uma atenção especial à forma como as pessoas
                navegam e compreendem uma interface.
              </p>

              <p className="m-0 max-w-140 text-sm leading-6 text-text-muted">
                Enquanto Junior Full-Stack Developer, trabalho para transformar
                ideias em experiências web funcionais, combinando frontend e
                backend com uma abordagem prática e cuidadosa.
              </p>

              <p className="m-0 max-w-140 text-sm leading-6 text-text-muted">
                Atualmente, estou a aprofundar conhecimentos em React, boas
                práticas e arquitetura de software, enquanto construo projetos
                que me ajudam a evoluir.
              </p>
            </div>
          </div>
        </section>

        {/* Competências */}
        <section
          id="competencias"
          className={`${section} border-y border-[rgba(27,36,64,.5)] bg-[linear-gradient(180deg,rgba(10,14,29,.5),rgba(5,7,17,.18))]`}
        >
          <div className={container}>
            <SectionHeading
              eyebrow="Competências"
              title="Tecnologias com que trabalho"
            >
              Uma base técnica que cresce com curiosidade e consistência.
            </SectionHeading>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {skillGroups.map((group) => (
                <article
                  key={group.title}
                  className="min-h-45 rounded-sm border border-border bg-card p-[1.35rem]"
                >
                  <h2 className="mb-3 font-body text-base font-bold">
                    {group.title}
                  </h2>

                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded border border-border px-1.5 py-1 text-sm text-text-muted"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Projetos */}
        <section id="projetos" className={section}>
          <div className={container}>
            <SectionHeading
              eyebrow="Projetos"
              title="Aplicações que estou a construir"
            >
              Projetos de prática e aprendizagem com foco em resolver problemas
              reais através de interfaces claras.
            </SectionHeading>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.number} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Experiência */}
        <section
          id="experiencia"
          className={`${section} border-y border-[rgba(27,36,64,.5)] bg-[linear-gradient(180deg,rgba(10,14,29,.5),rgba(5,7,17,.18))]`}
        >
          <div
            className={`${container} grid grid-cols-1 gap-10 md:grid-cols-[.8fr_1.2fr] md:gap-16`}
          >
            <SectionHeading
              eyebrow="Experiência"
              title={
                <>
                  Aprendizagem em
                  <br />
                  contexto real.
                </>
              }
            />

            <div className="relative border-l border-border pl-4">
              <div className="absolute -left-1 top-[.2rem] size-2 rounded-full bg-primary" />

              <p className={eyebrow}>Percurso atual</p>

              <h3 className="mb-3 font-title text-lg font-semibold leading-[1.05] tracking-[-.045em]">
                Desenvolvimento de aplicações web
              </h3>

              <p className="mb-6 max-w-140 text-sm leading-6 text-text-muted">
                Experiência construída através do desenvolvimento de projetos
                académicos e pessoais, explorando frontend, backend, integração
                de dados e interfaces responsivas.
              </p>

              <div className="flex max-w-130 flex-col gap-1 rounded-sm border border-border bg-card p-4">
                <strong className="text-xs">Informação a atualizar</strong>

                <span className="text-xs text-text-faint">
                  Este espaço está preparado para receber detalhes profissionais
                  futuros.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Formação */}
        <section id="formacao" className={section}>
          <div
            className={`${container} flex items-center gap-4 rounded-sm border border-border bg-card p-5 sm:px-6`}
          >
            <div className="grid size-10 min-w-10 place-items-center rounded-sm border border-primary-soft text-primary">
              <GraduationCap size={18} />
            </div>

            <div>
              <p className={eyebrow}>Formação</p>

              <h3 className="font-title text-base font-semibold leading-[1.05] tracking-[-.045em]">
                Licenciatura em Design Multimédia — Coimbra
              </h3>

              <p className="mt-1 text-sm leading-6 text-text-muted">
                Base académica em design, comunicação visual e experiência
                digital.
              </p>
            </div>
          </div>
        </section>

        {/* Contactos */}
        <section id="contactos" className={`${section} pb-20`}>
          <div
            className={`${container} grid grid-cols-1 items-end gap-10 md:grid-cols-[.8fr_1.2fr] md:gap-16`}
          >
            <div>
              <p className={eyebrow}>Contactos</p>

              <h2 className="mb-3 font-title text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-.045em]">
                Vamos trabalhar juntos?
              </h2>

              <p className="max-w-140 text-sm leading-6 text-text-muted">
                Estou disponível para conversar sobre projetos, oportunidades e
                novas formas de aprender.
              </p>
            </div>

            <div className="md:justify-self-end">
              <SocialLinks />
            </div>
          </div>

          <div
            className={`${container} mt-11 flex items-center justify-between gap-4 border-t border-border pt-6 max-md:flex-col max-md:items-start`}
          >
            <p className="m-0 text-xs text-text-faint">
              Os meus contactos profissionais serão adicionados brevemente.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contactos"
                className="inline-flex items-center gap-1 text-xs text-text-muted"
              >
                Email
                <Mail size={14} />
              </a>

              <a
                href="#contactos"
                className="inline-flex items-center gap-1 text-xs text-text-muted"
              >
                LinkedIn
                <Code2 size={14} />
              </a>

              <a
                href="#contactos"
                className="inline-flex items-center gap-1 text-xs text-text-muted"
              >
                GitHub
                <Code2 size={14} />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-5 text-xs text-text-faint">
        <div
          className={`${container} flex justify-between gap-4 max-md:flex-col`}
        >
          <span>© 2026 Crijolise Morglia Marçal</span>
          <span>Construído com curiosidade e código.</span>
        </div>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
