export const cinematicEase = [0.16, 1, 0.3, 1] as const;

export const revealUp = {
  hidden: { opacity: 0, y: 56 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.95, ease: cinematicEase },
  }),
};

export const revealRight = {
  hidden: { opacity: 0, x: 48 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { delay, duration: 0.95, ease: cinematicEase },
  }),
};

export const revealLeft = {
  hidden: { opacity: 0, x: -48 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { delay, duration: 0.95, ease: cinematicEase },
  }),
};
