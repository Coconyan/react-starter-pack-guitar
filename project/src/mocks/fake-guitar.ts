import {
  name,
  internet,
  datatype
} from 'faker';
import { Guitar } from '../types/guitar';

export const makeFakeGuitar = (): Guitar => ({
  id: datatype.number(200),
  name: name.title(),
  vendorCode: datatype.string(10),
  type: datatype.string(7),
  description: datatype.string(40),
  previewImg: internet.avatar(),
  stringCount: datatype.number(7),
  rating: datatype.number(5),
  price: datatype.number(99999),
} as Guitar);
