const labelStyleBySlideLenght = [
  {},
  {},
  {
    ang: '0',
    top: '0',
    left: '90',
  },
  {
    ang: '-31',
    top: '-47',
    left: '85',
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
    top: '-85',
    left: '50',
  },
  {
    //7
    ang: '-65',
    top: '-90',
    left: '40',
  },
  {
    ang: '-65',
    top: '-95',
    left: '40',
  }, //9
  {
    ang: '-65',
    top: '-100',
    left: '43',
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
    const y3 = Math.tan(probabilidadARadianes(probabilidad - 25)) * 50 + 49;
    return `polygon(51% 0, 100% 0, 100% ${y3}%, 51% 49%)`;
  }
  if (probabilidad >= 12.5) {
    const y3 =
      (0.5 - 0.5 / Math.tan(probabilidadARadianes(probabilidad))) * 100;
    return `polygon(51.5% 0, 100% 0, 99% ${y3}%, 51% 49%)`;
  }
  if (probabilidad >= 0) {
    const x2 = Math.tan(probabilidadARadianes(probabilidad)) * 50 + 50;
    return `polygon(51% 0, ${x2}% 0, 51% 50%)`;
  }
};
