type MapType = {
  [param: string]: string,
}

type MapRatingType = {
  [param: number]: string,
}

const mapToRussianGuitarType: MapType = {
  'electric': 'Электрогитара',
  'acoustic': 'Акустическая',
  'ukulele': 'Укулеле',
};

export const convertToRussianGuitarType = (type: string) => mapToRussianGuitarType[type] || 'неизвестный';

const mapToRussianRating: MapRatingType = {
  5: 'Отлично',
  4: 'Хорошо',
  3: 'Нормально',
  2: 'Плохо',
  1: 'Ужасно',
};

export const convertToRussianRating = (rate: number) => mapToRussianRating[Math.round(rate)] || 'неизвестный';

export const isEscapeKey = (key: string | undefined) => key === 'Escape';


export const existVerticalScroll = () => document.body.offsetHeight > window.innerHeight;

export const getBodyScrollTop = (): number => (
  // eslint-disable-next-line no-restricted-globals
  self.pageYOffset ||
  (document.documentElement && document.documentElement.scrollTop) ||
  (document.body && document.body.scrollTop)
);

export const handleBodyLock = (body: HTMLBodyElement | null) => {
  body?.classList.remove('body-lock');
  // modalFocusTrap.deactivate();
  if (body && existVerticalScroll()) {
    body?.dataset.scrollY && window.scrollTo(0, +body.dataset.scrollY);
  }
};
