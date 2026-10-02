'use client';

import React, { useEffect, useState } from 'react';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  charDelay?: number;
  initialDelay?: number;
  duration?: number;
  style?: React.CSSProperties;
}

export function AnimatedHeading({
  text,
  className = '',
  charDelay = 30,
  initialDelay = 200,
  duration = 500,
  style = {},
}: AnimatedHeadingProps) {
  const [isStarted, setIsStarted] = useState(false);
  const lines = text.split('\n');
  const lineLength = lines[0]?.length || 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStarted(true);
    }, initialDelay);

    return () => clearTimeout(timer);
  }, [initialDelay]);

  return (
    <h1
      className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.08] mb-4 ${className}`}
      style={{ letterSpacing: '-0.04em', ...style }}
    >
      {lines.map((line, lineIndex) => {
        let runningCharIndex = 0;
        const words = line.split(' ');

        return (
          <span
            key={lineIndex}
            className="block whitespace-normal md:whitespace-nowrap"
          >
            {words.map((word, wordIndex) => {
              const wordChars = word.split('');
              const wordStartCharIndex = runningCharIndex;
              runningCharIndex +=
                wordChars.length + (wordIndex < words.length - 1 ? 1 : 0);

              return (
                <React.Fragment key={wordIndex}>
                  <span className="inline-block whitespace-nowrap">
                    {wordChars.map((char, i) => {
                      const charIndex = wordStartCharIndex + i;
                      const delay =
                        lineIndex * lineLength * charDelay + charIndex * charDelay;

                      return (
                        <span
                          key={charIndex}
                          className="inline-block"
                          style={{
                            opacity: isStarted ? 1 : 0,
                            transform: isStarted
                              ? 'translateX(0)'
                              : 'translateX(-18px)',
                            transitionProperty: 'opacity, transform',
                            transitionDuration: `${duration}ms`,
                            transitionTimingFunction:
                              'cubic-bezier(0.16, 1, 0.3, 1)',
                            transitionDelay: `${delay}ms`,
                            willChange: 'opacity, transform',
                          }}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </span>
                  {wordIndex < words.length - 1 && (
                    <span
                      className="inline-block"
                      style={{
                        opacity: isStarted ? 1 : 0,
                        transform: isStarted
                          ? 'translateX(0)'
                          : 'translateX(-18px)',
                        transitionProperty: 'opacity, transform',
                        transitionDuration: `${duration}ms`,
                        transitionTimingFunction:
                          'cubic-bezier(0.16, 1, 0.3, 1)',
                        transitionDelay: `${
                          lineIndex * lineLength * charDelay +
                          (wordStartCharIndex + wordChars.length) * charDelay
                        }ms`,
                        willChange: 'opacity, transform',
                      }}
                    >
                      {'\u00A0'}
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}
