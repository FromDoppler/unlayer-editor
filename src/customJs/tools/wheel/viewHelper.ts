const labelStyleBySlideLenght = [
  {},
  {},
  {
    ang: '0',
    top: '0',
    left: '70',
  },
  {
    ang: '-33',
    top: '-30',
    left: '80',
  },
  {
    ang: '-50',
    top: '-60',
    left: '50',
  },
  {
    //5
    ang: '-50',
    top: '-80',
    left: '60',
  },
  {
    ang: '-60',
    top: '-90',
    left: '55',
  },
  {
    //7
    ang: '-60',
    top: '-90',
    left: '55',
  },
  {
    ang: '-70',
    top: '-100',
    left: '45',
  }, //9
  {
    ang: '-72',
    top: '-85',
    left: '30',
  },
];

export const getWheelLabelStyle = (slides: number) => {
  const style = labelStyleBySlideLenght[slides];
  return {
    transform: `rotate(${style.ang}deg)`,
    left: `${style.left}px`,
    top: `${style.top}px`,
  } as const;
};

const probabilidadARadianes = (probabilidad: number) =>
  (probabilidad / 100) * 2 * Math.PI;

export const getPosicionParaProbabilidad = (probabilidad: number) => {
  if (probabilidad >= 50) {
    // 2 segmentos
    const x4 = 100 - (Math.tan(probabilidadARadianes(probabilidad)) * 50 + 50);
    return `polygon(51% 0, 100% 0, 100% 100%, ${x4 + 1}% 100%, 51% 50%)`;
  }
  if (probabilidad >= 25) {
    const y3 = Math.tan(probabilidadARadianes(probabilidad - 25)) * 50 + 50;
    return `polygon(51% 0, 100% 0, 100% ${y3}%, 51% 50%)`;
  }
  if (probabilidad >= 12.5) {
    const y3 =
      (0.5 - 0.5 / Math.tan(probabilidadARadianes(probabilidad))) * 100;
    return `polygon(51% 0, 100% 0, 100% ${y3 - 1}%, 52% 50%)`;
  }
  if (probabilidad >= 0) {
    const x2 = Math.tan(probabilidadARadianes(probabilidad)) * 50 + 50;
    return `polygon(51% 0, ${x2}% 0, 51% 50%)`;
  }
};
