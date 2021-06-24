import {screen, render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../../exercise/03'

test('Ex 3', () => {
  render(<App />)

  const button = screen.getByRole('button', {name: /increment count/i})
  const display = screen.getByText(/the current count/i)

  expect(display).toHaveTextContent(/0/)

  userEvent.click(button)
  expect(display).toHaveTextContent(/1/)
  userEvent.click(button)
  expect(display).toHaveTextContent(/2/)
})
