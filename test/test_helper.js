import chai from 'chai'
import chaiImmutable from 'chai-immutable'
import {expect} from 'chai'
import {List, Map} from 'immutable'
import {setEntries, next, vote} from './../src/core'
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
      // let newList = currentState.get('movies').push(movie);
      // currentState.set('movies', newList)
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

describe('application logic', () => {
  describe('setEntries', () => {
    it('adds entries to the state', () => {
      const state = Map();
      const entries = List.of('Trainspotting', '28 Days Later');
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 Days Later')
      }));
    });
  });

  describe('takes the next two entries under vote', () => {
    it('vote Map on state', () => {
      const state = Map({
        entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
      });
      const nextState = next(state);
      expect(nextState).to.equal(
        Map({
          vote:  Map({ pair : List.of('Trainspotting', '28 Days Later')}),
          entries: List.of('Sunshine')
        })
      );
    });
  });

  describe('tally votes on pair being voted on', () => {
    it('add tally to state tree', () => {
      const state =   Map({
          vote:  Map({ pair : List.of('Trainspotting', '28 Days Later')}),
          entries: List.of('Sunshine')
        })
      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.equal(Map({
          vote:  Map({ pair : List.of('Trainspotting', '28 Days Later'),
                      tally: Map({'Trainspotting' : 1})
        }),
          entries: List.of('Sunshine')
        }));
    });

    it('increment tally if tally exists', () => {
      const state = Map({
          vote:  Map({ pair : List.of('Trainspotting', '28 Days Later'),
                      tally: Map({'Trainspotting' : 1, '28 Days Later': 1})
                    }),
          entries: List.of('Sunshine')
        });
      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.equal(Map({
          vote:  Map({ pair : List.of('Trainspotting', '28 Days Later'),
                       tally: Map({'Trainspotting' : 2, '28 Days Later': 1})
        }),
          entries: List.of('Sunshine')
        }))
    });

  });

});


// const entries = List.of('Trainspotting', '28 Days Later');
// console.log(entries.push('movie'))
// console.log(entries)
