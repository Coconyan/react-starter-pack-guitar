type MapType = {
  [param: string] : string,
}

const mapToRussianGuitarType : MapType = {
  'electric': 'Электрогитара',
  'acoustic': 'Акустическая',
  'ukulele': 'Укулеле',
};

export const convertToRussianGuitarType = (type: string) => mapToRussianGuitarType[type] || 'неизвестный';
