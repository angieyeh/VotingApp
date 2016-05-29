import {Map, fromJS} from 'Immutable';
import {setEntries, next, vote};

export default function reducer(state, action) {
  if (action.type === 'SET_ENTRIES')
    return setEntries(state, action.entries);

  if (action.type === 'NEXT')
    return next(state);

  if (action.type === 'VOTE')
    return vote(state, action.entry)

}
