// @flow

import * as React from 'react';
import { describe, it } from 'flow-typed-test';
import { proxy, useProxy } from 'valtio';

describe('valtio', () => {
  let state;

  it('init', () => {
    state = proxy({ count: 0, text: 'hello' });
    (state: {| count: number, text: string |});

    // $FlowExpectedError[incompatible-call]
    const fail = proxy('hello');
    // $FlowExpectedError[prop-missing]
    // $FlowExpectedError[incompatible-use]
    ++fail.count;
  });

  it('should be able to mutate from everywhere', () => {
    setInterval(() => {
      ++state.count;
    }, 1000);
  });

  it('should work in React via useProxy', () => {
    function Counter() {
      const snapshot = useProxy(state);

      // $FlowExpectedError[incompatible-call]
      const fail = useProxy('hello');
      // $FlowExpectedError[prop-missing]
      // $FlowExpectedError[incompatible-use]
      ++fail.count;

      return (
        <div>
          {snapshot.count}
          <button onClick={() => ++state.count}>+1</button>
        </div>
      );
    }
  });
});
