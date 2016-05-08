import chai from 'chai'
import chaiImmutable from 'chai-immutable'
import {expect} from 'chai'
import {List} from 'immutable'

chai.use(chaiImmutable);


describe('immutable list', () => {
  function movies(currentState, movies) {
    return currentState.push(movies)
  }
  describe('update state with new movie list', () => {
    it('create new immutable list and new state', () => {
      let state = List.of('movie1', 'movie2');
      let nextState = movies(state, 'movie3');
      expect(state).to.equal(List.of('movie1', 'movie2', 'movie4'));
      expect(nextState).to.equal(List.of('movie1', 'movie2', 'movie3'));
    });
  });
});
