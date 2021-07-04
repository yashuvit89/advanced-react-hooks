import {render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../exercise/04'

test('ex 04', () => {
  const {getByText, getByRole} = render(<App />)
  const log = getByRole('log')
  const chatCount = log.children.length
  const add = getByText(/add/i)
  const remove = getByText(/remove/i)

  userEvent.click(add)
  expect(log.children).toHaveLength(chatCount + 1)
  userEvent.click(remove)
  expect(log.children).toHaveLength(chatCount)

  const scrollTopSetter = jest.fn()

  Object.defineProperties(log, {
    scrollHeight: {
      get() {
        return 100
      },
    },
    scrollTop: {
      get() {
        return 0
      },
      set: scrollTopSetter,
    },
  })

  userEvent.click(add)
  expect(scrollTopSetter).toHaveBeenCalledTimes(1)
  expect(scrollTopSetter).toHaveBeenCalledWith(log.scrollHeight)

  // What does mockClear() do?
})
