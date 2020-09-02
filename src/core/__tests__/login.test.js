import React from 'react'
import {render, screen} from 'core/test-utils'
import '@testing-library/jest-dom/extend-expect'
import Login from '../login'
import {MemoryRouter} from 'react-router-dom'

test('it renders login', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>,
    {
      initialState: {
        user: null,
        contacts: [],
        totalContacts: 0
      }
    }
  )

  expect(screen.getByText('Log In')).toBeTruthy()
})
