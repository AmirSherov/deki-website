'use client';
import MainHero from './components/Hero/main';
import CardNav from './components/Navigation/index.jsx';
import CardSwap, { Card } from './components/Cards/index.jsx';
import Image from 'next/image';
import GlitchText from './components/GlitchText';
import Usage from "./components/Usage"
import Info from "./components/Info"
export default function Home() {
  const NavItems = [
    {
      label: 'О нас',
      bgColor: '#0D0716',
      textColor: '#fff',
      links: [
        { label: 'Продукт', ariaLabel: 'О продукте' },
        { label: 'Цены', ariaLabel: 'Цены' }
      ]
    },
    {
      label: 'Бренд',
      bgColor: '#170D27',
      textColor: '#fff',
      links: [{ label: 'Deki', ariaLabel: 'Бренд Deki' }]
    },
    {
      label: 'Контакты',
      bgColor: '#271E37',
      textColor: '#fff',
      links: [
        { label: 'Email', ariaLabel: 'Email us' },
        { label: 'Twitter', ariaLabel: 'Twitter' },
        { label: 'LinkedIn', ariaLabel: 'LinkedIn' }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <CardNav
        logoAlt="Deki"
        items={NavItems}
        baseColor="#fff"
        menuColor="#ffffffff"
        buttonBgColor="#ffffffff"
        buttonTextColor="#000000ff"
        ease="power3.out"
      />
      <MainHero />

      <section className="cards-section relative w-full bg-black text-white py-28">
        <div className="px-6">
          <div className="deki-cards">
            <div className="deki-cards-grid">
              <div>
                <h2>Музыкальные карточки <GlitchText speed={1} enableShadows enableOnHover={false} className="custom-class">
              Deki
            </GlitchText>
            </h2>
                <p>
                  Демонстрация стека с анимацией. Так будут выглядеть подборки, эфиры и превью плейлистов прямо в Telegram.
                </p>
                <div className="deki-list">
                  <span className="deki-pill">Эксклюзивные премьеры</span>
                  <span className="deki-pill">Алгоритмы по настроению</span>
                  <span className="deki-pill">Эфиры с артистами</span>
                </div>
                <a className="deki-cta" href="https://t.me/deki_music_bot?startapp" target="_blank" rel="noreferrer">
                  Запустить в Telegram
                </a>
              </div>
              <div className="deki-cards-right">
                <div className="relative" style={{ minHeight: 560 }}>
                  <CardSwap width={600} height={420} cardDistance={80} verticalDistance={90} delay={5000} pauseOnHover={false} onCardClick={() => {}}>
                    <Card>
                      <div style={{ padding: 18 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, opacity: 0.9 }}>
                          <span style={{ width: 8, height: 8, borderRadius: 9999, background: '#ffd29e', display: 'inline-block' }} />
                          <span>Треки по Настроению</span>
                        </div>
                        <div style={{ height: 380, position: 'relative', borderRadius: 14, overflow: 'hidden' }}>
                          <Image src="/track_by_mood.png" alt="Треки по Настроению" fill sizes="(max-width: 900px) 100vw, 640px" style={{ objectFit: 'cover' }} />
                        </div>
                      </div>
                    </Card>
                    <Card>
                      <div style={{ padding: 18 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, opacity: 0.9 }}>
                          <span style={{ width: 8, height: 8, borderRadius: 9999, background: '#ffd29e', display: 'inline-block' }} />
                          <span>Плейлист недели</span>
                        </div>
                        <div style={{ height: 340, position: 'relative', borderRadius: 14, overflow: 'hidden' }}>
                          <Image src="/playlist_of_week.png" alt="Плейлист недели" fill sizes="(max-width: 900px) 100vw, 640px" style={{ objectFit: 'cover' }} />
                        </div>
                      </div>
                    </Card>
                    <Card>
                      <div style={{ padding: 18 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, opacity: 0.9 }}>
                          <span style={{ width: 8, height: 8, borderRadius: 9999, background: '#ffd29e', display: 'inline-block' }} />
                          <span>Эксклюзивы Deki</span>
                        </div>
                        <div style={{ height: 340, position: 'relative', borderRadius: 14, overflow: 'hidden' }}>
                          <Image src="/unique.png" alt="Плейлист недели" fill sizes="(max-width: 900px) 100vw, 640px" style={{ objectFit: 'cover' }} />
                        </div>
                      </div>
                    </Card>
                  </CardSwap>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Usage/>
      <Info/>
    </main>
  );
}

