import { makeFakeComment } from '../../mocks/fake-comment';
import { makeFakeGuitar } from '../../mocks/fake-guitar';
import {
  loadCurrentGuitarComments,
  setCommentSend,
  loadCurrentGuitar,
  loadGuitars,
  data,
  loadCatalogGuitars,
  setIsCatalogLoading
} from './data';

const guitars = [makeFakeGuitar(), makeFakeGuitar(), makeFakeGuitar()];
const comments = [makeFakeComment(), makeFakeComment()];
const state = {
  guitars: [],
  catalogGuitars: [],
  currentGuitar: null,
  currentGuitarComments: [],
  isCommentSent: false,
  isDataLoaded: false,
  isCatalogLoading: false,
};

describe('Reducer: data', () => {
  it('without additional parameters should return initial state', () => {
    expect(data.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        guitars: [],
        catalogGuitars: [],
        currentGuitar: null,
        currentGuitarComments: [],
        isCommentSent: false,
        isDataLoaded: false,
        isCatalogLoading: false,
      });
  });

  it('should update guitars by load guitars', () => {
    expect(data.reducer(state, loadGuitars(guitars)))
      .toEqual({
        guitars: guitars,
        currentGuitar: null,
        currentGuitarComments: [],
        isCommentSent: false,
        isDataLoaded: true,
        catalogGuitars: [],
        isCatalogLoading: false,
      });
  });

  it('should update catalog guitars by load catalog guitars', () => {
    expect(data.reducer(state, loadCatalogGuitars(guitars)))
      .toEqual({
        guitars: [],
        currentGuitar: null,
        currentGuitarComments: [],
        isCommentSent: false,
        isDataLoaded: false,
        catalogGuitars: guitars,
        isCatalogLoading: false,
      });
  });

  it('should update guitar by load current guitar', () => {
    expect(data.reducer(state, loadCurrentGuitar(guitars[0])))
      .toEqual({
        guitars: [],
        currentGuitar: guitars[0],
        currentGuitarComments: [],
        isCommentSent: false,
        isDataLoaded: false,
        catalogGuitars: [],
        isCatalogLoading: false,
      });
  });

  it('should update current guitar comments by load current guitar comments', () => {
    expect(data.reducer(state, loadCurrentGuitarComments(comments)))
      .toEqual({
        guitars: [],
        currentGuitar: null,
        currentGuitarComments: comments,
        isCommentSent: false,
        isDataLoaded: false,
        catalogGuitars: [],
        isCatalogLoading: false,
      });
  });

  it('should update comment send by comment send', () => {
    expect(data.reducer(state, setCommentSend(true)))
      .toEqual({
        guitars: [],
        currentGuitar: null,
        currentGuitarComments: [],
        isCommentSent: true,
        isDataLoaded: false,
        catalogGuitars: [],
        isCatalogLoading: false,
      });
  });

  it('should set catalog loading status by set catalog loading', () => {
    expect(data.reducer(state, setIsCatalogLoading(true)))
      .toEqual({
        guitars: [],
        currentGuitar: null,
        currentGuitarComments: [],
        isCommentSent: false,
        isDataLoaded: false,
        catalogGuitars: [],
        isCatalogLoading: true,
      });
  });
});
