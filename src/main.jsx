import React, {useState} from "react";
import {createRoot} from "react-dom/client";
import {motion} from "motion/react";
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

const container = "mx-auto w-[calc(100%-2.5rem)] max-w-[1160px]";
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
          overflow-hidden
          bg-[linear-gradient(135deg,#0d1326_46%,#1b1a3b_46%,#211d3b_70%,#0d1326_70%)]
          max-sm:min-h-40
        "
      >
        <span className="absolute left-4 top-4 z-10 font-mono text-xs text-primary">
          {project.number}
        </span>

        {project.image ? (
          <img
            src={project.image}
            alt={`Imagem do projeto ${project.title}`}
            className="h-full min-h-45 w-full object-cover p-2 max-sm:min-h-40"
          />
        ) : (
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
        )}
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

        {(project.projectUrl || project.repositoryUrl) && (
          <div className="flex flex-wrap gap-4">
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-text transition-colors hover:text-primary"
              >
                Ver projeto
                <ArrowUpRight size={14} />
              </a>
            )}

            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-text transition-colors hover:text-primary"
              >
                Ver repositório
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        )}
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
          className={`${section} overflow-hidden pt-[clamp(0rem,10vw,4rem)]`}
        >
          <div
            className={`${container} grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_.9fr] md:gap-16`}
          >
            <div className="min-w-0 text-center md:text-left">
              <motion.p
                className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-primary-soft px-2.5 py-1.5 text-xs font-bold uppercase tracking-widest text-primary"
                initial={{opacity: 0, y: 24}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.5}}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="size-1.5 shrink-0 rounded-full bg-secondary" />
                Disponível para novas oportunidades
              </motion.p>

              <motion.h1
                className="m-0 mt-5 break-words font-title text-[clamp(2.8rem,7vw,5.4rem)] font-semibold leading-[1.05] tracking-[-.045em]"
                initial={{opacity: 0, y: 28}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.5}}
                transition={{
                  duration: 0.75,
                  delay: 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Crijolise
                <br />
                <em className="not-italic text-primary">Morglia Marçal</em>
              </motion.h1>

              <motion.p
                className="mb-3 mt-5 text-base text-text"
                initial={{opacity: 0, y: 24}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.5}}
                transition={{
                  duration: 0.7,
                  delay: 0.16,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Junior Full-Stack Developer
              </motion.p>

              <motion.p
                className="mx-auto max-w-140 text-sm leading-6 text-text-muted md:mx-0"
                initial={{opacity: 0, y: 24}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.5}}
                transition={{
                  duration: 0.7,
                  delay: 0.24,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Desenvolvo aplicações web com foco no frontend e no backend,
                combinando uma formação em Design Multimédia com aprendizagem
                prática em desenvolvimento web.
              </motion.p>

              <motion.div
                className="mt-7 flex flex-wrap items-center justify-center gap-3 md:justify-start"
                initial={{opacity: 0, y: 24}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.5}}
                transition={{
                  duration: 0.7,
                  delay: 0.32,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.a
                  className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-3 text-sm font-bold text-[#080611]"
                  href="#projetos"
                  whileHover={{y: -2}}
                  whileTap={{scale: 0.98}}
                  transition={{duration: 0.2}}
                >
                  Ver projetos
                  <ArrowUpRight size={14} />
                </motion.a>

                <motion.a
                  className="inline-flex items-center gap-2 rounded-sm border border-border px-4 py-3 text-sm font-bold"
                  href="#contactos"
                  whileHover={{y: -2}}
                  whileTap={{scale: 0.98}}
                  transition={{duration: 0.2}}
                >
                  Contactar-me
                  <Mail size={14} />
                </motion.a>

                <motion.a
                  className="inline-flex items-center gap-2 rounded-sm border border-border px-4 py-3 text-sm font-bold"
                  href="https://github.com/Crijo-Mcal"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{y: -2}}
                  whileTap={{scale: 0.98}}
                  transition={{duration: 0.2}}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-4"
                    aria-hidden="true"
                  >
                    <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.94 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.87.13 3.17.76.84 1.22 1.91 1.22 3.22 0 4.61-2.81 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
                  </svg>
                  GitHub
                </motion.a>

                <motion.a
                  className="inline-flex items-center justify-center gap-1.5 text-sm text-text-muted"
                  href="cv/Crijolise M Marçal.pdf"
                  download
                  whileHover={{y: -2}}
                  whileTap={{scale: 0.98}}
                  transition={{duration: 0.2}}
                >
                  <Download size={14} />
                  Descarregar CV
                </motion.a>
              </motion.div>
            </div>

            <motion.div
              className="relative mx-auto grid aspect-square w-full max-w-97.5 place-items-center overflow-hidden max-md:order-first"
              initial={{opacity: 0, y: 30}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.5}}
              transition={{
                duration: 0.8,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="absolute inset-[5%] rounded-full border border-primary-soft" />

              <div className="absolute inset-[3%] rotate-18 rounded-full border border-[rgba(154,124,255,.25)]" />

              <img
                src={`${import.meta.env.BASE_URL}querry.png`}
                alt="Retrato de Crijolise Morglia Marçal"
                className="h-[83%] w-[83%] rounded-full border-7 border-surface-soft object-cover grayscale-[.12]"
              />

              <motion.div
                className="absolute bottom-[13%] right-[2%] max-w-[90%] border border-border bg-[#091126] px-3 py-2 font-mono text-xs text-secondary"
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.5}}
                transition={{
                  duration: 0.6,
                  delay: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                &lt;code exists /&gt;
                <strong className="block font-body text-xs text-text">
                  aprendendo a construir.
                </strong>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Sobre */}
        <section id="sobre" className={section}>
          <div
            className={`${container} grid grid-cols-1 gap-10 md:grid-cols-[.8fr_1.2fr] md:gap-16`}
          >
            <motion.div
              initial={{opacity: 0, y: 28}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.5}}
              transition={{
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
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
            </motion.div>

            <motion.div
              className="flex flex-col gap-3.5"
              initial={{opacity: 0, y: 28}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.5}}
              transition={{
                duration: 0.75,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p className="m-0 max-w-140 text-sm leading-6 text-text-muted">
                Sou <span className="font-bold text-text">Crijolise</span>,
                venho de{" "}
                <span className="font-bold text-text">Timor-Leste</span> e
                concluí a{" "}
                <span className="font-bold text-text">
                  Licenciatura em Design e Multimédia
                </span>{" "}
                na{" "}
                <span className="font-bold text-text">
                  Universidade de Coimbra
                </span>
                .
              </p>

              <p className="m-0 max-w-140 text-sm leading-6 text-text-muted">
                Atualmente, dedico-me ao desenvolvimento web, explorando tanto o
                frontend como o backend.
              </p>

              <p className="m-0 max-w-140 text-sm leading-6 text-text-muted">
                Gosto de aprender, experimentar novas ideias e continuar a
                evoluir através de novos projetos.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Competências */}
        <section
          id="competencias"
          className={`${section} border-y border-[rgba(27,36,64,.5)] bg-[linear-gradient(180deg,rgba(10,14,29,.5),rgba(5,7,17,.18))]`}
        >
          <div className={container}>
            <motion.div
              initial={{opacity: 0, y: 28}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.5}}
              transition={{
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <SectionHeading
                eyebrow="Competências"
                title="Tecnologias com que trabalho"
              >
                Uma base técnica que cresce com curiosidade e consistência.
              </SectionHeading>
            </motion.div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {skillGroups.map((group, index) => (
                <motion.article
                  key={group.title}
                  className="rounded-sm border border-border bg-card p-[1.35rem]"
                  initial={{opacity: 0, y: 28}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true, amount: 0.5}}
                  transition={{
                    duration: 0.7,
                    delay: 0.08 + index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
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
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Projetos */}
        <section id="projetos" className={section}>
          <div className={container}>
            <motion.div
              initial={{opacity: 0, y: 28}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.5}}
              transition={{
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <SectionHeading
                eyebrow="Projetos"
                title="Aplicações que estou a construir"
              >
                Projetos de prática e aprendizagem com foco em resolver
                problemas reais através de interfaces claras.
              </SectionHeading>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
              initial={{opacity: 0, y: 28}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.1}}
              transition={{
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {projects.map((project) => (
                <ProjectCard key={project.number} project={project} />
              ))}
            </motion.div>
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
            <motion.div
              initial={{opacity: 0, y: 28}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.5}}
              transition={{
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
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
            </motion.div>

            <motion.div
              className="relative border-l border-border pl-4"
              initial={{opacity: 0, y: 28}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.5}}
              transition={{
                duration: 0.75,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="absolute -left-1 top-[.2rem] size-2 rounded-full bg-primary" />

              <p className={eyebrow}>Estágio · BSWEBCONNECT (Aveiro)</p>

              <p className="mb-2 text-xs text-text-faint">
                1 de junho de 2026 — atualidade
              </p>

              <h3 className="mb-3 font-title text-lg font-semibold leading-[1.05] tracking-[-.045em]">
                Desenvolvimento da aplicação ReservaJá
              </h3>

              <p className="mb-6 max-w-140 text-sm leading-6 text-text-muted">
                Durante o estágio, desenvolvo a ReservaJá, uma aplicação web de
                marcação entre profissionais e clientes, com funcionalidades de
                gestão de reservas, pagamentos online e outras ferramentas de
                apoio ao negócio.
              </p>

              <motion.div
                className="flex max-w-130 flex-col gap-1 rounded-sm border border-border bg-card p-4"
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.5}}
                transition={{
                  duration: 0.65,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <strong className="text-xs">Frontend &amp; Backend</strong>

                <span className="text-xs leading-5 text-text-faint">
                  Desenvolvimento de interfaces, funcionalidades backend,
                  integração de dados e implementação de novas funcionalidades
                  para a aplicação.
                </span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contactos */}
        <section id="contactos" className={`${section} pb-20`}>
          <div
            className={`${container} grid grid-cols-1 items-end gap-10 md:grid-cols-[.8fr_1.2fr] md:gap-16`}
          >
            <motion.div
              initial={{opacity: 0, y: 28}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.5}}
              transition={{
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p className={eyebrow}>Contactos</p>

              <h2 className="mb-3 font-title text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-.045em]">
                Vamos trabalhar juntos?
              </h2>

              <p className="max-w-140 text-sm leading-6 text-text-muted">
                Estou disponível para conversar sobre projetos, oportunidades e
                novas formas de aprender.
              </p>
            </motion.div>

            <motion.div
              className="md:justify-self-end"
              initial={{opacity: 0, y: 24}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.5}}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=crijolisemor25@gmail.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-border px-4 py-3 text-sm text-text-muted transition-colors duration-150 hover:border-primary hover:text-primary"
                whileHover={{y: -2}}
                whileTap={{scale: 0.98}}
                transition={{duration: 0.2}}
              >
                <Mail size={16} />
                crijolisemor25@gmail.com
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            className={`${container} mt-11 border-t border-border pt-6`}
            initial={{opacity: 0, y: 18}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.5}}
            transition={{
              duration: 0.65,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="m-0 text-xs text-text-faint">
              Estou disponível para novas oportunidades e projetos.
            </p>
          </motion.div>
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
