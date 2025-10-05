import { useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
  onScrollExit
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);
  const initialOffsetsRef = useRef(new Map());
  const lastScrollTopRef = useRef(0);
  const scrollDirectionRef = useRef(0);
  const exitTriggeredRef = useRef(false);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller.scrollTop,
        containerHeight: scroller.clientHeight,
        scrollContainer: scroller
      };
    }
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    element => {
      if (useWindowScroll) {
        let top = 0;
        let node = element;
        while (node) {
          top += node.offsetTop || 0;
          node = node.offsetParent;
        }
        return top;
      } else {
        return element.offsetTop;
      }
    },
    [useWindowScroll]
  );

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const scrollDelta = scrollTop - lastScrollTopRef.current;
    if (Math.abs(scrollDelta) > 1) {
      scrollDirectionRef.current = scrollDelta > 0 ? 1 : -1;
    }
    lastScrollTopRef.current = scrollTop;
    let allCardsStacked = true;

    const endElement = useWindowScroll
      ? document.querySelector('.scroll-stack-end')
      : scrollerRef.current?.querySelector('.scroll-stack-end');

    const endElementTop = endElement ? getElementOffset(endElement) : 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = getElementOffset(card);
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;
      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = i === 0 && scrollTop <= 10 ? 1 : 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;
      if (scaleProgress < 1) {
        allCardsStacked = false;
      }

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = getElementOffset(cardsRef.current[j]);
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;
      const finalStackPosition = stackPositionPx + itemStackDistance * i;

      if (allCardsStacked && i === cardsRef.current.length - 1) {
        translateY = finalStackPosition;
      } else if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
        if (translateY > finalStackPosition) {
          translateY = finalStackPosition;
        }
      } else if (scrollTop > pinEnd) {
        translateY = finalStackPosition;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 50,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';
        if (i === 0 && scrollTop <= 10) {
          card.style.transform = 'translateZ(0) scale(1)';
        } else {
          card.style.transform = transform;
        }
        card.style.filter = filter;
        if (scaleProgress > 0 || i === 0) {
          card.style.opacity = '1';
        }

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        const scrollProgress = (scrollTop - pinStart) / (pinEnd - pinStart);
        const isNearEnd = scrollProgress > 0.85;
        // const isNearStart = scrollProgress < 0.15 && scrollTop > 0;
        
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          exitTriggeredRef.current = false;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
        if (!exitTriggeredRef.current) {
          const scroller = scrollerRef.current;
          const maxScroll = scroller.scrollHeight - scroller.clientHeight;
          const isAtBottom = scrollTop >= maxScroll - 50;
          const isAtTop = scrollTop <= 10;
          if (allCardsStacked && (isNearEnd || isAtBottom) && scrollDirectionRef.current > 0) {
            exitTriggeredRef.current = true;
            setTimeout(() => {
              onScrollExit?.('down');
              setTimeout(() => {
                exitTriggeredRef.current = false;
              }, 500);
            }, 200);
          } 
          else if (isAtTop && scrollDirectionRef.current < 0) {
            exitTriggeredRef.current = true;
            setTimeout(() => {
              onScrollExit?.('up');
              setTimeout(() => {
                exitTriggeredRef.current = false;
              }, 500);
            }, 200);
          }
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    onScrollExit,
    calculateProgress,
    parsePercentage,
    getScrollData,
    getElementOffset
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    if (useWindowScroll) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075
      });

      lenis.on('scroll', handleScroll);

      const raf = time => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      return lenis;
    } else {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner'),
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        gestureOrientationHandler: true,
        normalizeWheel: true,
        wheelMultiplier: 1,
        touchInertiaMultiplier: 35,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075,
        touchInertia: 0.6
      });

      lenis.on('scroll', handleScroll);

      const raf = time => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      return lenis;
    }
  }, [handleScroll, useWindowScroll]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : scroller.querySelectorAll('.scroll-stack-card')
    );

    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;
    const cacheInitialOffsets = () => {
      initialOffsetsRef.current.clear();
      cards.forEach(card => {
        if (useWindowScroll) {
          const rect = card.getBoundingClientRect();
          initialOffsetsRef.current.set(card, rect.top + window.scrollY);
        } else {
          initialOffsetsRef.current.set(card, card.offsetTop);
        }
      });
      const endEl = useWindowScroll
        ? document.querySelector('.scroll-stack-end')
        : scroller.querySelector('.scroll-stack-end');
      if (endEl) {
        if (useWindowScroll) {
          const rect = endEl.getBoundingClientRect();
          initialOffsetsRef.current.set(endEl, rect.top + window.scrollY);
        } else {
          initialOffsetsRef.current.set(endEl, endEl.offsetTop);
        }
      }
    };

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      // Ensure first card starts at full scale
      if (i === 0) {
        card.style.transform = 'translateZ(0) scale(1)';
        card.style.webkitTransform = 'translateZ(0) scale(1)';
      } else {
        card.style.transform = 'translateZ(0)';
        card.style.webkitTransform = 'translateZ(0)';
      }
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
    });
    cacheInitialOffsets();

    setupLenis();

    updateCardTransforms();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
      const initialOffsets = initialOffsetsRef.current;
      initialOffsets.clear();
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    setupLenis,
    updateCardTransforms
  ]);
  useLayoutEffect(() => {
    const onResize = () => {
      const scroller = scrollerRef.current;
      const cards = cardsRef.current;
      if (!scroller || !cards?.length) return;
      initialOffsetsRef.current.clear();
      cards.forEach(card => {
        if (useWindowScroll) {
          const rect = card.getBoundingClientRect();
          initialOffsetsRef.current.set(card, rect.top + window.scrollY);
        } else {
          initialOffsetsRef.current.set(card, card.offsetTop);
        }
      });
      const endEl = useWindowScroll
        ? document.querySelector('.scroll-stack-end')
        : scroller.querySelector('.scroll-stack-end');
      if (endEl) {
        if (useWindowScroll) {
          const rect = endEl.getBoundingClientRect();
          initialOffsetsRef.current.set(endEl, rect.top + window.scrollY);
        } else {
          initialOffsetsRef.current.set(endEl, endEl.offsetTop);
        }
      }
      updateCardTransforms();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [useWindowScroll, updateCardTransforms]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
