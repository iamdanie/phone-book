import React from 'react'
import {render, screen} from './../../core/test-utils'
import '@testing-library/jest-dom/extend-expect'
import ListContacts from '../list-contacts'
import {MemoryRouter} from 'react-router-dom'

test('it renders contacts list', () => {
  render(
    <MemoryRouter>
      <ListContacts />
    </MemoryRouter>,
    {
      initialState: {
        user: {id: 1},
        contacts: [
          {
            id: 1,
            firstName: 'DANIELA',
            lastName: 'Bravo',
            phone: '102102101',
            pageSize: 10
          }
        ],
        totalContacts: 1
      }
    }
  )

  expect(screen.getByText('DANIELA')).toBeTruthy()
})
