import {screen, render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {alfredTip} from '@kentcdodds/react-workshop-app/test-utils'
import App from '../../exercise/02'

beforeEach(() => {
  jest.spyOn(window, 'fetch')
  jest.spyOn(console, 'error')
})
afterEach(() => window.fetch.mockRestore())

test('Ex: 2', async () => {
  render(<App />)

  const input = screen.getByRole('textbox', /pokemonName/i)
  const submit = screen.getByText(/^submit$/i)
  userEvent.type(input, 'pikachu')
  userEvent.click(submit)

  await screen.findByRole('heading', {name: /pikachu/i})

  userEvent.clear(input)
  userEvent.type(input, 'ditto')
  userEvent.click(submit)

  await screen.findByRole('heading', {name: /ditto/i})

  window.fetch.mockClear()

  userEvent.click(submit)
  await screen.findByRole('heading', {name: /ditto/i})

  alfredTip(
    () => expect(window.fetch).not.toHaveBeenCalled(),
    'Make certain that you are providing a dependencies list in useEffect!',
  )

  console.error.mockImplementation(() => {})
  userEvent.clear(input)
  userEvent.type(input, 'yaswanth')
  userEvent.click(submit)

  expect(await screen.findByRole('alert')).toHaveTextContent(
    /There was an error.*Unsupported pokemon.*.yaswanth/,
  )
  expect(console.error).toHaveBeenCalledTimes(2)
  console.error.mockReset()
})
