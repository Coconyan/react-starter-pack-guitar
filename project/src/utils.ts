type MapType = {
  [param: string] : string,
}

type MapRatingType = {
  [param: number] : string,
}

const mapToRussianGuitarType : MapType = {
  'electric': 'Электрогитара',
  'acoustic': 'Акустическая',
  'ukulele': 'Укулеле',
};

export const convertToRussianGuitarType = (type: string) => mapToRussianGuitarType[type] || 'неизвестный';

const mapToRussianRating : MapRatingType = {
  5: 'Отлично',
  4: 'Хорошо',
  3: 'Нормально',
  2: 'Плохо',
  1: 'Ужасно',
};

export const convertToRussianRating = (rate: number) => mapToRussianRating[Math.round(rate)] || 'неизвестный';

export const isEscapeKey = (key : string | undefined) => key === 'Escape';
