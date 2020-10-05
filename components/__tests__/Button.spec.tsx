import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import CurrentPosition from '../D3/CurrentPosition';
let documentBody: RenderResult;
describe('<NotFound />', () => {
    beforeEach(() => {
        documentBody = render(<CurrentPosition />);
    });
    it('shows not found message', () => {
        expect(documentBody.getByText('Not Found')).toBeInTheDocument();
        expect(documentBody.getByText('404')).toBeInTheDocument();
    });
});