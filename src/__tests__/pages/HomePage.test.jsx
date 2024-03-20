// !STARTERCONF You should delete this page

import { render, screen } from '@testing-library/react';

import Page from '@/app/home/page';

describe('Homepage', () => {
  it('renders the Components', () => {
    render(<Page />);

  });
});
