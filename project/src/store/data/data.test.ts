import { makeFakeComment } from '../../mocks/fake-comment';
import { makeFakeGuitar } from '../../mocks/fake-guitar';
import {
  loadCurrentGuitarComments,
  loadGuitarsComments,
  setGuitarsComments,
  setCommentSend,
  loadCurrentGuitar,
  loadGuitars,
  data
} from './data';

const guitars = [makeFakeGuitar(), makeFakeGuitar(), makeFakeGuitar()];
const comments = [makeFakeComment(), makeFakeComment()];
const state = {
  guitars: [],
  currentGuitar: null,
  currentGuitarComments: [],
  guitarsComments: [],
  isCommentSent: false,
  isDataLoaded: false,
};

describe('Reducer: data', () => {
  it('without additional parameters should return initial state', () => {
    expect(data.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        guitars: [],
        currentGuitar: null,
        currentGuitarComments: [],
        guitarsComments: [],
        isCommentSent: false,
        isDataLoaded: false,
      });
  });

  it('should update guitars by load guitars', () => {
    expect(data.reducer(state, loadGuitars(guitars)))
      .toEqual({
        guitars: guitars,
        currentGuitar: null,
        currentGuitarComments: [],
        guitarsComments: [],
        isCommentSent: false,
        isDataLoaded: true,
      });
  });

  it('should update guitar by load current guitar', () => {
    expect(data.reducer(state, loadCurrentGuitar(guitars[0])))
      .toEqual({
        guitars: [],
        currentGuitar: guitars[0],
        currentGuitarComments: [],
        guitarsComments: [],
        isCommentSent: false,
        isDataLoaded: false,
      });
  });

  it('should update current guitar comments by load current guitar comments', () => {
    expect(data.reducer(state, loadCurrentGuitarComments(comments)))
      .toEqual({
        guitars: [],
        currentGuitar: null,
        currentGuitarComments: comments,
        guitarsComments: [],
        isCommentSent: false,
        isDataLoaded: false,
      });
  });

  it('should update guitar comments by load guitar comments', () => {
    expect(data.reducer(state, loadGuitarsComments(comments)))
      .toEqual({
        guitars: [],
        currentGuitar: null,
        currentGuitarComments: [],
        guitarsComments: [comments],
        isCommentSent: false,
        isDataLoaded: false,
      });
  });

  it('should update guitar comments by set guitar comments', () => {
    expect(data.reducer(state, setGuitarsComments([])))
      .toEqual({
        guitars: [],
        currentGuitar: null,
        currentGuitarComments: [],
        guitarsComments: [],
        isCommentSent: false,
        isDataLoaded: false,
      });
  });

  it('should update comment send by comment send', () => {
    expect(data.reducer(state, setCommentSend(true)))
      .toEqual({
        guitars: [],
        currentGuitar: null,
        currentGuitarComments: [],
        guitarsComments: [],
        isCommentSent: true,
        isDataLoaded: false,
      });
  });
});
