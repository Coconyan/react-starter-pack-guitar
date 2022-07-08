export enum AppRoute {
  Cart = '/cart',
  Product = '/product',
  Root = '/',
  NotFound = '*',
}

export enum APIRoute {
  Guitars = '/guitars',
  Comments = '/comments',
  Coupons = '/coupons'
}

export enum NameSpace {
  data = 'DATA',
  cart = 'CART',
}

export const GUITARS_COUNT_PER_PAGE = 9;

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
}

export enum PromoCode {
  Light = 'light-333',
  Medium = 'medium-444',
  Height = 'height-555',
}
