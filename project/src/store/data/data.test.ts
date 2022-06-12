import { makeFakeComment } from '../../mocks/fake-comment';
import { makeFakeGuitar } from '../../mocks/fake-guitar';
import {
  loadCurrentGuitarComments,
  setCommentSend,
  loadCurrentGuitar,
  loadGuitars,
  data,
  loadCatalogGuitars,
  setIsCatalogLoading,
  setIsSearchLoading,
  loadSearchGuitars,
  setLastQuery
} from './data';

const guitars = [makeFakeGuitar(), makeFakeGuitar(), makeFakeGuitar()];
const comments = [makeFakeComment(), makeFakeComment()];
const query = 'query';
const state = {
  guitars: [],
  catalogGuitars: [],
  searchGuitars: [],
  currentGuitar: null,
  currentGuitarComments: [],
  isCommentSent: false,
  isDataLoaded: false,
  isCatalogLoading: false,
  isSearchLoading: false,
  lastQuery: '',
};

describe('Reducer: data', () => {
  it('without additional parameters should return initial state', () => {
    expect(data.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        guitars: [],
        catalogGuitars: [],
        searchGuitars: [],
        currentGuitar: null,
        currentGuitarComments: [],
        isCommentSent: false,
        isDataLoaded: false,
        isCatalogLoading: false,
        isSearchLoading: false,
        lastQuery: '',
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
        searchGuitars: [],
        isSearchLoading: false,
        lastQuery: '',
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
        searchGuitars: [],
        isSearchLoading: false,
        lastQuery: '',
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
        searchGuitars: [],
        isSearchLoading: false,
        lastQuery: '',
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
        searchGuitars: [],
        isSearchLoading: false,
        lastQuery: '',
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
        searchGuitars: [],
        isSearchLoading: false,
        lastQuery: '',
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
        searchGuitars: [],
        isSearchLoading: false,
        lastQuery: '',
      });
  });

  it('should set search loading status by set catalog search', () => {
    expect(data.reducer(state, setIsSearchLoading(true)))
      .toEqual({
        guitars: [],
        currentGuitar: null,
        currentGuitarComments: [],
        isCommentSent: false,
        isDataLoaded: false,
        catalogGuitars: [],
        isCatalogLoading: false,
        searchGuitars: [],
        isSearchLoading: true,
        lastQuery: '',
      });
  });

  it('should set search guitars by load search guitars', () => {
    expect(data.reducer(state, loadSearchGuitars(guitars)))
      .toEqual({
        guitars: [],
        currentGuitar: null,
        currentGuitarComments: [],
        isCommentSent: false,
        isDataLoaded: false,
        catalogGuitars: [],
        isCatalogLoading: false,
        searchGuitars: guitars,
        isSearchLoading: false,
        lastQuery: '',
      });
  });

  it('should set last query by set last query', () => {
    expect(data.reducer(state, setLastQuery(query)))
      .toEqual({
        guitars: [],
        currentGuitar: null,
        currentGuitarComments: [],
        isCommentSent: false,
        isDataLoaded: false,
        catalogGuitars: [],
        isCatalogLoading: false,
        searchGuitars: [],
        isSearchLoading: false,
        lastQuery: query,
      });
  });
});
