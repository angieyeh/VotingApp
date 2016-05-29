import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('setting entries', () => {
    const initialState = Map();
    let setEntriesAction = {type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later']};
    const nextState = reducer(initialState, setEntriesAction);
    expect(nextState).to.equal(fromJS({
      entries: ['Trainspotting', '28 Days Later']
    }))
  });

  it('sets movies for voting', () => {
    const initialState = fromJS({
      entries: ['Trainspotting', '28 Days Later']
    });
    let nextAction = {type: 'NEXT'};
    const nextState = reducer(initialState, nextAction)
    expect(nextState).to.equal(fromJs({
      vote: {
        pair: ['Trainspotting', '28 Days Later']
      },
      entries: []
    }))
  })

  it('handles vote', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later']
      },
      entries: []
    });
    let voteAction = {type: 'VOTE', entry: 'Trainspotting'};
    const nextState = reducer(initialState, voteAction);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {'Trainspotting': 1}
      },
      entries: []
    }));

  })

});
