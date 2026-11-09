import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Star,
  X,
} from 'lucide-react';

const WHATSAPP_URL = 'https://wa.me/5554999476365';
const INSTAGRAM_URL = 'https://www.instagram.com/dentista.suelentochetto/';

const navLinks = [
  ['Início', '#inicio'],
  ['Cirurgia', '#cirurgia'],
  ['Estética', '#estetica'],
  ['Sobre', '#sobre'],
  ['Localização', '#localizacao'],
];

const images = {
  hero: '/images/01-retrato.jpg',
  ambiente1: '/images/ambiente-clinica.webp',
  ambiente2: '/images/ambiente-sala.webp',
};

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function ButtonLink({
  href,
  children,
  variant = 'solid',
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'solid' | 'outline' | 'light';
  external?: boolean;
}) {
  const variantStyles = {
    solid: 'bg-primary text-primary-foreground hover:bg-graphite shadow-soft',
    outline:
      'border border-graphite/25 bg-background text-foreground hover:border-primary hover:text-primary',
    light: 'bg-background text-primary hover:bg-blush',
  }[variant];

  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-medium tracking-wide transition-all duration-300 ${variantStyles}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? 'border-b border-border bg-background/95 backdrop-blur'
          : 'bg-transparent'
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 ${
          scrolled ? 'h-16' : 'h-20'
        }`}
      >
        <a href="#inicio" className="leading-tight">
          <span className="block font-display text-xl text-foreground">
            Dra. Suelen Tochetto
          </span>
          <span className="block text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground">
            Odontologia & Bucomaxilo
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {navLinks.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm text-foreground/80 transition-colors hover:text-primary"
            >
              {label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-graphite"
          >
            Agendar consulta
          </a>
        </nav>

        <button
          className="p-2 lg:hidden text-foreground cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {menuOpen && (
        <nav
          className="border-t border-border bg-background px-6 pb-8 pt-4 lg:hidden"
          aria-label="Menu móvel"
        >
          {navLinks.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block border-b border-border py-4 font-display text-2xl"
            >
              {label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex min-h-12 items-center justify-center rounded-full bg-primary text-primary-foreground"
          >
            Agendar consulta
          </a>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-b from-blush/60 to-background pt-28 lg:pt-32"
    >
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-12 lg:grid-cols-2 lg:gap-14 lg:pb-16">
        <div className="animate-rise order-2 lg:order-1">
          <h1 className="text-5xl leading-[1.05] text-foreground sm:text-6xl xl:text-7xl font-display">
            Precisão de cirurgiã,{' '}
            <em className="text-primary italic">cuidado sem pressa.</em>
          </h1>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Um atendimento que une conhecimento, delicadeza e atenção às suas
            necessidades, respeitando seu tempo e suas escolhas.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#cirurgia">Conhecer a Cirurgia</ButtonLink>
            <ButtonLink href="#estetica" variant="outline">
              Conhecer a Estética
            </ButtonLink>
          </div>
        </div>

        <div className="relative order-1 mx-auto w-full max-w-md lg:order-2 lg:max-w-none">
          <div
            className="absolute -right-6 -top-6 h-full w-full rounded-t-[12rem] rounded-b-lg border border-primary/30"
            aria-hidden="true"
          />
          <img
            src={images.hero}
            alt="Dra. Suelen Tochetto"
            className="relative aspect-[2/3] w-full rounded-t-[12rem] rounded-b-lg object-cover shadow-soft"
          />
        </div>
      </div>
    </section>
  );
}

function Surgery() {
  const surgicalProcedures = [
    'Cirurgia bucomaxilofacial',
    'Cirurgia ortognática e procedimentos relacionados à mandíbula',
    'Extração de sisos',
    'Cirurgia oral',
    'Atendimento com sedação',
  ];

  return (
    <section id="cirurgia" className="relative py-12 lg:py-16">
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 lg:gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">Cirurgia</p>
          <h2 className="mt-4 text-4xl leading-tight sm:text-5xl font-display">
            Cuidado e precisão em cada detalhe.
          </h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Cada procedimento é conduzido com atenção, planejamento e respeito às
            necessidades de cada paciente. Você recebe orientações claras sobre
            cada etapa, com tranquilidade para compreender e decidir.
          </p>
          <div className="mt-8 rounded-lg bg-primary p-8 text-primary-foreground shadow-soft">
            <p className="font-display text-3xl italic leading-snug">
              “Cada etapa explicada, no seu tempo.”
            </p>
          </div>
          <div className="mt-8">
            <ButtonLink href={WHATSAPP_URL} external>
              Agendar uma avaliação
            </ButtonLink>
          </div>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7">
          <ol className="border-t border-border">
            {surgicalProcedures.map((item, idx) => (
              <Reveal key={item} delay={idx * 80}>
                <li className="group flex items-baseline gap-6 border-b border-border py-7 transition-colors hover:bg-muted sm:px-4">
                  <span className="font-display text-sm italic text-primary">
                    0{idx + 1}
                  </span>
                  <span className="font-display text-2xl leading-snug text-foreground transition-transform duration-300 group-hover:translate-x-2 sm:text-3xl">
                    {item}
                  </span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Aesthetic() {
  const treatments = [
    ['Harmonização labial', 'Contorno e volume em equilíbrio com seus traços.'],
    ['Toxina botulínica', 'Suavidade de expressão, preservando a naturalidade.'],
    ['Facetas', 'Um sorriso planejado a partir das suas características.'],
  ];

  return (
    <section id="estetica" className="relative bg-blush/50 py-12 lg:py-16">
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 lg:gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">Estética</p>
          <h2 className="mt-4 text-4xl leading-tight sm:text-5xl font-display">
            Realce sua beleza com <em className="text-primary italic">naturalidade.</em>
          </h2>
          <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
            Procedimentos estéticos realizados com delicadeza, atenção aos
            detalhes e respeito às características individuais de cada pessoa.
          </p>

          <div className="mt-8 hidden lg:block">
            <ButtonLink href={WHATSAPP_URL} external>
              Quero saber mais
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-6 lg:col-start-7" delay={120}>
          <div className="space-y-6">
            {treatments.map(([title, desc]) => (
              <div
                key={title}
                className="border-l-2 border-primary/40 pl-6 transition-colors hover:border-primary"
              >
                <h3 className="text-2xl font-display">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 lg:hidden">
            <ButtonLink href={WHATSAPP_URL} external>
              Quero saber mais
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Family() {
  const cards = [
    [
      'Clínica geral',
      'Prevenção, limpeza e tratamentos do dia a dia, com acompanhamento próximo.',
    ],
    [
      'Atendimento pediátrico',
      'Um primeiro contato tranquilo e acolhedor para os pequenos.',
    ],
    [
      'Atendimento de emergência',
      'Orientação e cuidado quando você mais precisa.',
    ],
  ];

  return (
    <section className="relative py-12 lg:py-16">
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Família</p>
          <h2 className="mt-4 text-4xl leading-tight sm:text-5xl font-display">
            Um cuidado completo, em todas as fases da vida.
          </h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Além das especialidades cirúrgicas e estéticas, você também encontra
            atendimento odontológico para diferentes necessidades do dia a dia.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
          {cards.map(([title, desc], idx) => (
            <Reveal key={title} delay={idx * 100} className="h-full">
              <div className="h-full bg-background p-10 transition-colors duration-300 hover:bg-muted">
                <span className="font-display text-5xl italic text-primary/40">
                  {idx + 1}
                </span>
                <h3 className="mt-6 text-2xl font-display">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const pillars = [
    'Calma e paciência durante o atendimento.',
    'Carinho e atenção com cada paciente.',
    'Respeito às escolhas individuais.',
    'Explicações claras sobre procedimentos.',
    'Atendimento que contempla clínica geral, cirurgia e harmonização.',
  ];

  return (
    <section id="sobre" className="bg-graphite py-12 text-background lg:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Sobre o atendimento</p>
          <h2 className="mt-4 text-4xl leading-tight sm:text-5xl font-display">
            Mais do que cuidar do sorriso,{' '}
            <em className="text-blush italic">cuidar de quem confia em mim.</em>
          </h2>
          <p className="mt-8 font-display text-xl italic text-background/60">
            — Dra. Suelen Tochetto
          </p>
        </Reveal>

        <ul>
          {pillars.map((item, idx) => (
            <Reveal key={item} delay={idx * 80}>
              <li className="flex gap-5 border-b border-background/15 py-6">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className="text-lg text-background/90">{item}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Hours() {
  const schedule = [
    ['Segunda a sexta', '8h às 20h'],
    ['Sábado', '8h às 12h'],
  ];

  return (
    <section className="relative py-12 lg:py-16">
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="eyebrow">Horários</p>
          <h2 className="mt-4 max-w-2xl text-4xl leading-tight sm:text-5xl font-display">
            Um horário que cabe na sua rotina.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <Reveal className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            {schedule.map(([days, hours]) => (
              <div key={days} className="rounded-lg bg-blush/60 p-8">
                <Clock className="h-5 w-5 text-primary" />
                <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {days}
                </p>
                <p className="mt-2 font-display text-5xl text-foreground">
                  {hours}
                </p>
              </div>
            ))}
          </Reveal>

          <Reveal className="space-y-8 lg:col-span-4 lg:col-start-9" delay={120}>
            <div>
              <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary">
                <MapPin className="h-4 w-4" /> Erechim — RS
              </p>
              <p className="mt-2 text-lg">Av. Maurício Cardoso, 190, Centro.</p>
            </div>

            <div>
              <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary">
                <MapPin className="h-4 w-4" /> Curitiba — PR
              </p>
              <p className="mt-2 text-lg">
                Atendimento disponível na cidade. Consulte pelo WhatsApp.
              </p>
            </div>

            <ButtonLink href={WHATSAPP_URL} external>
              Agendar pelo WhatsApp
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function LocationAndGallery() {
  const galleryItems = [
    {
      src: images.ambiente2,
      alt: 'Sala de atendimento do consultório',
      cls: 'sm:col-span-2 aspect-[4/3]',
    },
    {
      src: images.ambiente1,
      alt: 'Detalhe do ambiente do consultório',
      cls: 'aspect-[3/4] sm:aspect-auto',
    },
  ];

  const [activeImage, setActiveImage] = useState<number | null>(null);

  useEffect(() => {
    if (activeImage === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveImage(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeImage]);

  return (
    <section id="localizacao" className="bg-muted py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Ambiente</p>
            <h2 className="mt-4 max-w-xl text-4xl leading-tight sm:text-5xl font-display">
              Um ambiente preparado para receber você.
            </h2>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">
            Toque nas fotos para ampliar.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {galleryItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={`group overflow-hidden rounded-lg text-left cursor-pointer ${item.cls}`}
              aria-label={`Ampliar: ${item.alt}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </button>
          ))}
        </div>

        <Reveal className="mt-10 grid overflow-hidden rounded-lg border border-border bg-background lg:grid-cols-3">
          <div className="p-10">
            <MapPin className="h-5 w-5 text-primary" />
            <h3 className="mt-6 text-2xl font-display">Como chegar</h3>
            <p className="mt-3 text-muted-foreground">
              Av. Maurício Cardoso, 190
              <br />
              Centro, Erechim — RS
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Av.+Maur%C3%ADcio+Cardoso%2C+190%2C+Centro%2C+Erechim+-+RS"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Abrir no Google Maps <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <iframe
            title="Mapa: Av. Maurício Cardoso, 190, Centro, Erechim - RS"
            src="https://www.google.com/maps?q=Av.+Maur%C3%ADcio+Cardoso,+190,+Centro,+Erechim+-+RS,+Brasil&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-80 w-full border-0 lg:col-span-2 lg:h-full lg:min-h-96"
          />
        </Reveal>
      </div>

      {activeImage !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-graphite/90 p-6 backdrop-blur-sm cursor-pointer"
          onClick={() => setActiveImage(null)}
        >
          <button
            className="absolute right-6 top-6 text-background cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Fechar"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImage(null);
            }}
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={galleryItems[activeImage]?.src}
            alt={galleryItems[activeImage]?.alt}
            className="animate-rise max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

function Reviews() {
  return (
    <section className="relative py-12 lg:py-16">
      <Reveal className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="eyebrow">Avaliações</p>
        <h2 className="mt-4 text-4xl leading-tight sm:text-5xl font-display">
          A confiança de quem já passou por aqui.
        </h2>
        <div
          className="mt-8 flex items-center justify-center gap-1.5"
          aria-label="5 de 5 estrelas"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-primary text-primary" />
          ))}
        </div>
        <p className="mt-6 font-display text-7xl text-foreground font-semibold">
          5,0
        </p>
        <p className="mt-2 text-sm uppercase tracking-[0.2em] text-muted-foreground">
          no Google · 61 avaliações
        </p>
      </Reveal>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className="px-6 pb-12 lg:pb-16">
      <Reveal className="mx-auto max-w-7xl overflow-hidden rounded-lg bg-primary px-8 py-12 text-center text-primary-foreground sm:px-16 lg:py-16 shadow-soft">
        <h2 className="mx-auto max-w-3xl text-4xl leading-tight sm:text-6xl font-display">
          Seu cuidado começa com <em>uma conversa.</em>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-primary-foreground/85">
          Será um prazer receber você, entender suas necessidades e orientar os
          próximos passos.
        </p>
        <div className="mt-8">
          <ButtonLink href={WHATSAPP_URL} variant="light" external>
            Fale comigo pelo WhatsApp
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-2xl">Dra. Suelen Tochetto</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Cirurgiã-Dentista · Cirurgiã Bucomaxilofacial
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            CRO/RS 29836 · CRO/PR 37789
          </p>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            Av. Maurício Cardoso, 190, Centro
            <br />
            Erechim/RS
          </p>
          <p>
            Seg. a sex.: 8h às 20h
            <br />
            Sáb.: 8h às 12h
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <MessageCircle className="h-4 w-4" /> (54) 99947-6365
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <Instagram className="h-4 w-4" /> @dentista.suelentochetto
          </a>
        </div>
      </div>

      <p className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © 2026 Dra. Suelen Tochetto. Todos os direitos reservados.
      </p>
    </footer>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      <Header />
      <main>
        <Hero />
        <Surgery />
        <Aesthetic />
        <Family />
        <About />
        <Hours />
        <LocationAndGallery />
        <Reviews />
        <CtaBanner />
      </main>
      <Footer />
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar pelo WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft transition-transform hover:scale-105"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}
