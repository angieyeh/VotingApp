import {List, Map} from 'immutable'

function setEntries(currentState, list) {
  return currentState.set('entries', list);
}

export {setEntries};
