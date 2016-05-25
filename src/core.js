import {List, Map} from 'immutable'

function setEntries(currentState, list) {
  return currentState.set('entries', list);
}

function next(state) {
  let winner;
  const entries = state.get('entries');
  // console.log('tally', state.get('vote'))
  if (state.get('vote')) {
    winner = state.get('vote').get('tally').keyOf(state.get('vote').get('tally').max());
    return state.merge({ vote : Map({ pair : entries.take(2) }), entries : entries.skip(2).push(winner)});
  }

  return state.merge({ vote : Map({ pair : entries.take(2) }), entries : entries.skip(2)});
  // return Map({ vote : Map({ pair : state.get('entries').slice(0, 2)}), entries : state.get('entries').slice(2)});
}

function vote(state, entry) {
  return state.updateIn(
    ['vote', 'tally', entry],
    0,
    tally => tally + 1
  );
}

export {setEntries, next, vote};
