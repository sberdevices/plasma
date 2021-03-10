import { createAction, createEmptyAction } from './createAction';

describe('createAction fns', () => {
    it('createAction', () => {
        expect(createAction('type', 'payload')).toStrictEqual({ type: 'type', payload: 'payload' });
    });

    it('createEmptyAction', () => {
        expect(createEmptyAction('type')).toStrictEqual({ type: 'type' });
    });
});
