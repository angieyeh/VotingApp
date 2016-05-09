import chai from 'chai'
import chaiImmutable from 'chai-immutable'
import {expect} from 'chai'
import {List, Map} from 'immutable'

chai.use(chaiImmutable);


describe('immutability', () => {
  function movies(currentState, movies) {
    return currentState.push(movies);
  }
  describe('movie list is immutable', () => {
    it('create new immutable list and new state', () => {
      let state = List.of('movie1', 'movie2');
      let nextState = movies(state, 'movie3');
      expect(state).to.equal(List.of('movie1', 'movie2'));
      expect(nextState).to.equal(List.of('movie1', 'movie2', 'movie3'));
    });
  });

  describe('immutable tree', () => {
    function movieStateTree(currentState, movie) {
      let newList = currentState.get('movies').push(movie);
      return currentState.update('movies', movies => movies.push(movie));
    }
    it('create new immutable map and new state', () => {
      let state = Map({movies: List.of('movie1', 'movie2')});
      let nextState = movieStateTree(state, 'movie3');
      expect(state).to.equal(Map({movies: List.of('movie1', 'movie2')}));
      expect(nextState).to.equal(Map({movies: List.of('movie1', 'movie2', 'movie3')}))
    })
  });
});
