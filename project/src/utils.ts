import { datatype } from 'faker';
import { FocusTrap } from 'focus-trap';
import {
  Comment,
  CommentPost
} from './types/comment';
import {
  Guitar,
  Guitars
} from './types/guitar';

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

export const handleBodyLock = (body: HTMLBodyElement | null, modalFocusTrap?: FocusTrap | undefined) => {
  body?.classList.remove('body-lock');
  modalFocusTrap?.deactivate();
  if (body && existVerticalScroll()) {
    body.dataset.scrollY && window.scrollTo(0, +body.dataset.scrollY); // todo fix scroll
  }
};

export const convertCommentPostToComment = (commentPost: CommentPost): Comment => {
  const comment: Comment = JSON.parse(JSON.stringify(commentPost));
  comment.id = datatype.uuid();
  comment.createAt = new Date().toISOString();
  return comment;
};

export const cartGuitarIncrement = (cartGuitars: Guitars, currentGuitar: Guitar, setVisibleCount?: (arg0: number) => void) => {
  const index = cartGuitars.findIndex((cartGuitar) => cartGuitar.id === currentGuitar.id);
  const cartGuitarWithNewOne = JSON.parse(JSON.stringify(cartGuitars));

  if (index >= 0) {
    const cartCount = cartGuitarWithNewOne[index].cartCount;
    if (cartCount && cartCount < 99) {
      cartGuitarWithNewOne[index].cartCount = cartCount + 1;
      setVisibleCount && setVisibleCount(cartCount + 1);
    } else {
      setVisibleCount && setVisibleCount(cartCount);
    }
  } else {
    const guitarWithCount = JSON.parse(JSON.stringify(currentGuitar));
    guitarWithCount.cartCount = 1;
    cartGuitarWithNewOne.push(guitarWithCount);
  }

  return cartGuitarWithNewOne;
};

export const cartGuitarDecrement = (cartGuitars: Guitars, currentGuitar: Guitar, setVisibleCount?: (arg0: number) => void) => {
  const index = cartGuitars.findIndex((cartGuitar) => cartGuitar.id === currentGuitar.id);
  const cartGuitarWithNewOne = JSON.parse(JSON.stringify(cartGuitars));

  if (index >= 0) {
    const cartCount = cartGuitarWithNewOne[index].cartCount;
    if (cartCount > 1) {
      cartGuitarWithNewOne[index].cartCount = cartCount - 1;
      setVisibleCount && setVisibleCount(cartCount - 1);
    } else {
      setVisibleCount && setVisibleCount(cartCount);
    }
  }

  return cartGuitarWithNewOne;
};

export const cartGuitarInputCount = (cartGuitars: Guitars, currentGuitar: Guitar, inputCount: number, setVisibleCount: (arg0: number) => void) => {
  const index = cartGuitars.findIndex((cartGuitar) => cartGuitar.id === currentGuitar.id);
  const cartGuitarWithNewOne = JSON.parse(JSON.stringify(cartGuitars));

  if (index >= 0) {
    const cartCount = cartGuitarWithNewOne[index].cartCount;
    if (cartCount && (inputCount > 0 && inputCount < 100)) {
      cartGuitarWithNewOne[index].cartCount = inputCount;
      setVisibleCount(inputCount);
    } else if (inputCount <= 0) {
      cartGuitarWithNewOne[index].cartCount = 1;
      setVisibleCount(1);
    } else {
      cartGuitarWithNewOne[index].cartCount = 99;
      setVisibleCount(99);
    }
  }

  return cartGuitarWithNewOne;
};

export const numberWithSpaces = (number: number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
