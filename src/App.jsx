import { useEffect, useState } from 'react';
import { services, projects, steps, testimonials } from './data.js';

const EMAIL = 'info@example.com';
const PHONE = '021-00000000';

const navItems = [
  { href: '#services', label: 'خدمات' },
  { href: '#portfolio', label: 'نمونه کارها' },
  { href: '#process', label: 'فرآیند' },
  { href: '#about', label: 'درباره ما' },
  { href: '#contact', label: 'تماس' },
];

const filters = [
  { key: 'all', label: 'همه' },
  { key: 'home', label: 'منزل' },
  { key: 'office', label: 'دفتر کار' },
  { key: 'commercial', label: 'تجاری' },
];

const persianYear = new Intl.DateTimeFormat('fa-IR', { year: 'numeric' }).format(new Date());

// ---------- Hooks ----------

function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

function useRevealOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ---------- Components ----------

function Navbar({ scrolled }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#top" className="logo" onClick={close}>
          <span className="logo-mark">◆</span>
          استودیو <em>طراحی</em>
        </a>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={close}>
              {item.label}
            </a>
          ))}
          <a href="#contact" className="btn btn-small nav-cta" onClick={close}>
            مشاوره رایگان
          </a>
        </nav>

        <button
          className={`burger ${open ? 'active' : ''}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="منو"
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true" />
      <div className="container hero-content">
        <span className="eyebrow reveal">طراحی داخلی با نگاه مینیمال</span>
        <h1 className="reveal">
          فضایی که <em>زندگی</em> در آن جریان دارد
        </h1>
        <p className="reveal">
          خانه و محل کار شما را با ترکیب زیبایی، کاربرد و جزئیات دقیق طراحی می‌کنیم؛
          فضایی که هر روز از آن لذت ببرید.
        </p>
        <div className="hero-actions reveal">
          <a href="#contact" className="btn">شروع پروژه</a>
          <a href="#portfolio" className="btn btn-ghost">مشاهده نمونه‌کارها</a>
        </div>

        <div className="hero-stats reveal">
          <div><strong>+۱۵۰</strong><span>پروژه اجرا شده</span></div>
          <div><strong>+۱۰</strong><span>سال تجربه</span></div>
          <div><strong>۹۸٪</strong><span>رضایت مشتریان</span></div>
        </div>
      </div>
      <a href="#services" className="scroll-hint" aria-label="پایین">↓</a>
    </section>
  );
}

function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <SectionHeader eyebrow="خدمات ما" title="راهکارهایی برای هر فضا" />
        <div className="services-grid">
          {services.map((s, i) => (
            <article className="service-card reveal" style={{ transitionDelay: `${i * 80}ms` }} key={s.title}>
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="service-arrow">←</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const [active, setActive] = useState('all');
  const visible = projects.filter((p) => active === 'all' || p.category === active);

  return (
    <section className="section section-alt" id="portfolio">
      <div className="container">
        <SectionHeader eyebrow="نمونه کارها" title="پروژه‌های منتخب" />

        <div className="filters reveal">
          {filters.map((f) => (
            <button
              key={f.key}
              className={`chip ${active === f.key ? 'active' : ''}`}
              onClick={() => setActive(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {visible.map((p) => (
            <article className="project" key={p.id}>
              <div className="project-visual" style={{ background: p.gradient }}>
                <img
                  src={`${import.meta.env.BASE_URL}images/project-${p.id}.jpg`}
                  alt={p.title}
                  loading="lazy"
                  onError={(e) => e.currentTarget.remove()}
                />
                <span className="project-tag">{p.label}</span>
              </div>
              <div className="project-info">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section" id="process">
      <div className="container">
        <SectionHeader eyebrow="فرآیند کار" title="از ایده تا تحویل کلید" />
        <div className="steps">
          {steps.map((s, i) => (
            <div className="step reveal" style={{ transitionDelay: `${i * 100}ms` }} key={s.title}>
              <span className="step-num">{String(i + 1).padStart(2, '۰').replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d])}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section about" id="about">
      <div className="container about-grid">
        <div className="about-visual reveal">
          <div className="about-badge">
            <strong>۱۰+</strong>
            <span>سال تجربه</span>
          </div>
        </div>
        <div className="reveal">
          <SectionHeader eyebrow="درباره ما" title="طراحی‌ای که با زندگی شما هماهنگ است" align="right" />
          <p>
            استودیو ما به فضاهایی باور دارد که هم زیبا باشند و هم کاربردی. هر پروژه را
            با گوش دادن به شما آغاز می‌کنیم، نه با یک الگوی از پیش ساخته‌شده.
          </p>
          <p>
            باور ما این است که یک فضای خوب، بدون اتلاف متراژ و انرژی، کیفیت روزمره زندگی
            را واقعاً تغییر می‌دهد.
          </p>
          <a href="#contact" className="btn">با ما صحبت کنید</a>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeader eyebrow="نظرات مشتریان" title="آنچه همکاران ما می‌گویند" />
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <figure className="testimonial reveal" style={{ transitionDelay: `${i * 100}ms` }} key={t.name}>
              <span className="quote-mark">“</span>
              <blockquote>{t.text}</blockquote>
              <figcaption>
                <strong>{t.name}</strong>
                <small>{t.role}</small>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', type: 'طراحی منزل', message: '' });
  const [sent, setSent] = useState(false);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`درخواست مشاوره: ${form.type}`);
    const body = encodeURIComponent(
      `نام: ${form.name}\nتلفن: ${form.phone}\nنوع پروژه: ${form.type}\n\n${form.message}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section className="section section-alt" id="contact">
      <div className="container contact-grid">
        <div className="reveal">
          <SectionHeader eyebrow="تماس با ما" title="بیایید فضای بعدی‌تان را بسازیم" align="right" />
          <ul className="contact-list">
            <li><span>تلفن</span><b dir="ltr">{PHONE}</b></li>
            <li><span>ایمیل</span><b dir="ltr">{EMAIL}</b></li>
            <li><span>آدرس</span><b>تهران، خیابان نمونه، پلاک ۱۰</b></li>
            <li><span>ساعات کاری</span><b>شنبه تا پنجشنبه، ۹ تا ۱۸</b></li>
          </ul>
        </div>

        <form className="contact-form reveal" onSubmit={submit}>
          {sent ? (
            <div className="sent">
              <div className="sent-icon">✓</div>
              <h3>ممنون از شما</h3>
              <p>پنجره ایمیل شما باز شد. در صورت عدم باز شدن، مستقیماً با ما تماس بگیرید.</p>
              <button type="button" className="btn btn-ghost-dark" onClick={() => setSent(false)}>
                فرم جدید
              </button>
            </div>
          ) : (
            <>
              <div className="field">
                <label htmlFor="name">نام و نام خانوادگی</label>
                <input id="name" name="name" value={form.name} onChange={update} required />
              </div>
              <div className="field">
                <label htmlFor="phone">شماره تماس</label>
                <input id="phone" name="phone" type="tel" dir="ltr" value={form.phone} onChange={update} required />
              </div>
              <div className="field">
                <label htmlFor="type">نوع پروژه</label>
                <select id="type" name="type" value={form.type} onChange={update}>
                  {services.map((s) => (
                    <option key={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="message">توضیحات</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="متراژ، بودجه تقریبی و هر نکته‌ای که باید بدانیم"
                  value={form.message}
                  onChange={update}
                />
              </div>
              <button type="submit" className="btn">ارسال درخواست</button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <a href="#top" className="logo">
          <span className="logo-mark">◆</span>
          استودیو <em>طراحی</em>
        </a>
        <p>© {persianYear} استودیو طراحی داخلی. تمامی حقوق محفوظ است.</p>
      </div>
    </footer>
  );
}

function SectionHeader({ eyebrow, title, align = 'center' }) {
  return (
    <div className={`section-header reveal ${align === 'right' ? 'align-right' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
    </div>
  );
}

// ---------- App ----------

export default function App() {
  const scrolled = useScrolled();
  useRevealOnScroll();

  return (
    <>
      <Navbar scrolled={scrolled} />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Process />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
