'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import FaultyTerminal from '../FaultyTerminal';
import s from './index.module.scss';
import GlitchText from '../../GlitchText/index.js';
import CountUp from '../Counter/index.js';
import ElectronicBorder from '../ElectronicBroder/index.js';
const stats = [
  { key: 'tracks', value: 50, label: 'ТРЕКОВ ВНУТРИ DEKI', places: [10, 1], suffix: 'K+' },
  { key: 'albums', value: 1200, label: 'АЛЬБОМОВ', places: [1000, 100, 10, 1], suffix: '+' },
  { key: 'live', value: 24, label: 'ОНЛАЙН‑РАДИО С ЖИВЫМИ СЕТАМИ', places: [10, 1], suffix: '/7' }
];

const highlights = [
  {
    title: 'Музыка прямо в Telegram',
    description:
      'Deki встречается с чатом в канале: запускай плейлисты, делись треками и устраивай прямые эфиры с артистами — без сторонних приложений.'
  },
  {
    title: 'Алгоритмы, которые слышат настроение',
    description:
      'Мы подбираем музыку, которая подходит именно вашей компании — от спокойных джазовых композиций до заводных хитов для вечеринки.'
  },
  {
    title: 'Поддержка артистов',
    description:
      'Эксклюзивные релизы и прямые донаты музыкантам — чтобы твой плейлист всегда звучал по‑новому.'
  }
];

export default function Main() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                     window.innerWidth < 768;
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className={s.hero}>
      <div className={s.bg}>
        {!isMobile && (
          <FaultyTerminal
            className={s.terminal}
            scale={0.5}
            gridMul={[2.2, 1.6]}
            digitSize={1.15}
            timeScale={0.22}
            glitchAmount={0.45}
            chromaticAberration={0.01}
            tint="#6c5ce7"
            mouseReact={false}
            brightness={1.3}
          />
        )}
        <div className={s.radial} />
        <div className={s.fade} />
      </div>

      <div className={s.container}>
        <header className={s.header}>
          <h5 className={s.title}>
            <GlitchText speed={1} enableShadows enableOnHover={false} className="custom-class">
              Deki
            </GlitchText>
              Музыкальный сервис внутри Telegram, созданный для каждого
          </h5>
          <p className={s.description}>
            Подбираем треки под настроение беседы, подключаем эксклюзивные премьеры и устраиваем прямые эфиры с артистами. Всё — не выходя из любимого мессенджера
          </p>
          <div className={s.ctaRow}>
            <Link href="https://t.me/deki_music_bot?startapp" target="_blank" className={s.btnPrimary}>
              Запустить в Telegram
            </Link>
            <a href="https://t.me/deki_music_bot?startapp" target="_blank" rel="noreferrer" className={s.btnSecondary}>
              Послушать демо‑канал
            </a>
          </div>
        </header>

        <div className={s.bottomRow}>
          <dl className={s.stats}>
            {stats.map(item => (
              <div key={item.key} className={s.statItem}>
                <dt className={s.statLabel}>{item.label}</dt>
                <dd className={s.statValue}>
                  <div className={s.statValueRow}>

<CountUp
  from={0}
  to={item.value}
  separator=","
  direction="up"
  duration={1}
  className="count-up-text"
/>
                    {item.suffix && <span className={s.suffix}>{item.suffix}</span>}
                  </div>
                </dd>
              </div>
            ))}
          </dl>

          <ul className={s.highlights}>
            {highlights.map(item => (
             <ElectronicBorder
              key={item.title}
              color="#4c00ffff"
              speed={1}
              chaos={0.5}
              thickness={2}
              style={{ borderRadius: 16 }}
>
               <li key={item.title} className={s.highlightItem}>
                <h3 className={s.highlightTitle}>{item.title}</h3>
                <p className={s.highlightText}>{item.description}</p>
              </li>
            </ElectronicBorder>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
