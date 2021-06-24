import {screen, render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../../exercise/01'

test('Ex 1', () => {
  render(<App />)

  const input = screen.getByRole('button')
  expect(input).toHaveTextContent('0')
  userEvent.click(input)

  expect(input).toHaveTextContent('1')
})
