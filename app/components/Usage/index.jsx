import { useEffect, useState } from "react";
import ScrollStack, { ScrollStackItem } from "./components/ScrollStack";
import "./Usage.css";

export default function UsageSection() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const handleScrollExit = (direction) => {
    // Find the usage section element
    const usageSection = document.querySelector('.usage-section');
    if (!usageSection) return;
    
    if (direction === 'down') {
      // Scroll to next section
      const nextSection = usageSection.nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // If no next section, scroll to bottom
        window.scrollTo({ 
          top: document.body.scrollHeight, 
          behavior: 'smooth' 
        });
      }
    } else if (direction === 'up') {
      // Scroll to previous section
      const prevSection = usageSection.previousElementSibling;
      if (prevSection) {
        prevSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // If no previous section, scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };
  
  return (
    <section className="usage-section">
      <div className="usage-container">
        <div className="usage-left">
          <h2>Большой заголовок секции Usage</h2>
          <p>
            Заглушка для текста: краткое и ёмкое описание блока. Здесь может быть 1–2
            предложения, которые объясняют ценность и контекст.
          </p>
          <p>
            Заглушка для плюсов/подпунктов. Сюда можно добавить преимущества, особенности
            или тезисы, которые вы позже замените.
          </p>
          <p>
            Ещё один текстовый блок-заглушка. Держим все тексты в белом цвете и крупным
            кеглем, как просили.
          </p>
        </div>
        <div className="usage-right">
          <ScrollStack
            useWindowScroll={false}
            itemDistance={isMobile ? 80 : 100}
            itemScale={isMobile ? 0.02 : 0.03}
            baseScale={isMobile ? 0.9 : 0.88}
            itemStackDistance={isMobile ? 10 : 15}
            stackPosition={isMobile ? "25%" : "30%"}
            scaleEndPosition={isMobile ? "8%" : "10%"}
            onScrollExit={handleScrollExit}
          >
            <ScrollStackItem>
              <div>
                <h3>Карточка 1</h3>
                <p>
                  Красивая тёмная прозрачная карточка со стеклянным эффектом. Заглушка
                  описания.
                </p>
              </div>
            </ScrollStackItem>
            <ScrollStackItem>
              <div>
                <h3>Карточка 2</h3>
                <p>Текст заглушки. Можно рассказать о функции или кейсе использования.</p>
              </div>
            </ScrollStackItem>
            <ScrollStackItem>
              <div>
                <h3>Карточка 3</h3>
                <p>Здесь будет короткое описание. Карточки шире и визуально приятнее.</p>
              </div>
            </ScrollStackItem>
            <ScrollStackItem>
              <div>
                <h3>Карточка 4</h3>
                <p>Ещё одна карточка со стеклянным эффектом и мягкими тенями.</p>
              </div>
            </ScrollStackItem>
            <ScrollStackItem>
              <div>
                <h3>Карточка 5</h3>
                <p>Финальная заглушка. Вы сможете заменить этот текст в любой момент.</p>
              </div>
            </ScrollStackItem>
          </ScrollStack>
        </div>
      </div>
    </section>
  );
}
