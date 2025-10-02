import React from "react";
import styles from "./FallingWord.module.css";

type Props = {
  text?: string;
  repeat?: boolean; // optionally repeat animation
};

export default function FallingWord({ text = "WELCOME", repeat = false }: Props) {
  // if repeating, we can add animation iteration via inline style
  return (
    <div className={styles.wrap}>
      <div
        className={styles.falling}
        aria-label={text}
        role="img"
      >
        {[...text].map((ch, i) => {
          // skip rendering for spaces visually with non-breaking space
          const display = ch === " " ? "\u00A0" : ch;
          const style: React.CSSProperties = {
            // set CSS variable --i to stagger
            ["--i" as any]: i,
            // optional: if repeat true, override animation to loop
            animationIterationCount: repeat ? "infinite" : undefined,
            animationDelay: undefined, // keep delay controlled by --i * --stagger
          };

          return (
            <span
              key={i}
              className={styles.letter}
              style={style}
              aria-hidden={false}
            >
              {display}
            </span>
          );
        })}
      </div>
    </div>
  );
}
