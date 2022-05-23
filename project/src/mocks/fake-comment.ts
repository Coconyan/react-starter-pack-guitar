import {
  name,
  datatype
} from 'faker';
import { Comment } from '../types/comment';

export const makeFakeComment = (): Comment => ({
  guitarId: datatype.number(200),
  userName: name.title(),
  advantage: datatype.string(10),
  disadvantage: datatype.string(10),
  comment: datatype.string(10),
  rating: datatype.number(5),
} as Comment);
