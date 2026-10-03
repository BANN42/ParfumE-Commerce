import test from 'node:test';
import assert from 'node:assert/strict';

import { checkUserHasAValideToken } from '../middlewares/handleToken.js';
import generateToken from '../utils/generateToken.js';

test('accepts a valid bearer token', () => {
  const token = generateToken({ _id: 'user-123' }, '5m');
  const req = { headers: { authorization: `Bearer ${token}` } };
  let nextCalled = false;

  const res = {
    status(code) {
      this.code = code;
      return this;
    },
    json(payload) {
      this.payload = payload;
      return this;
    },
  };

  checkUserHasAValideToken(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, true);
  assert.equal(res.code, undefined);
});

test('rejects a missing token', () => {
  const req = { headers: {} };
  let nextCalled = false;

  const res = {
    status(code) {
      this.code = code;
      return this;
    },
    json(payload) {
      this.payload = payload;
      return this;
    },
  };

  checkUserHasAValideToken(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, false);
  assert.equal(res.code, 401);
});
