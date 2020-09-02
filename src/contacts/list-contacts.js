import React from 'react'
import {Link} from 'react-router-dom'
import {Button, makeStyles} from '@material-ui/core'
import {DataTable, ScreenHeader} from 'core/components'
import {useDispatch, useSelector} from 'react-redux'
import {getContacts, deleteContact} from 'core/redux/actions'
import {DeleteForever} from '@material-ui/icons'
import {useSnackbar} from 'core/contexts/snackbar-context'
import ConfirmationModal from 'core/components/confirmation-modal'

const useStyles = makeStyles(({palette}) => ({
  registerButton: {
    color: palette.common.white
  },
  screenHeaderContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}))

const ListContacts = () => {
  const [modalOpen, setModalOpen] = React.useState(false)
  const [contactId, setContactId] = React.useState(null)
  const classes = useStyles()
  const dispatch = useDispatch()
  const snackbar = useSnackbar()
  const {contacts, loading, totalContacts, pageSize} = useSelector(
    state => state
  )

  React.useEffect(() => {
    const fetchContactlist = async () => {
      try {
        await dispatch(getContacts())
      } catch (err) {
        snackbar(
          `Error: ${err.error ||
            'Something went wrong trying to remove this contact'}`
        )
      }
    }
    fetchContactlist()
  }, [dispatch])

  const handleNewPageRequest = async page => {
    const newFrom = page * pageSize
    const newTo = newFrom + pageSize
    await dispatch(getContacts(newFrom, newTo))
  }

  const handleDeleteContact = async () => {
    try {
      setModalOpen(false)
      await dispatch(deleteContact(contactId))
      snackbar('Contact deleted successfully')
      await dispatch(getContacts())
    } catch (err) {
      snackbar(
        `Error: ${err.error ||
          'Something went wrong trying to remove this contact'}`
      )
    }
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setContactId(null)
  }

  const handleModalOpen = contactId => {
    setModalOpen(true)
    setContactId(contactId)
  }

  const columns = [
    {
      id: 'firstName',
      label: 'First Name'
    },
    {
      id: 'lastName',
      label: 'Last Name'
    },
    {
      id: 'phone',
      label: 'Phone Number'
    },
    {
      id: 'actions',
      label: 'Actions',
      component: {
        type: 'actions',
        actions: [
          {
            onClick: contact => handleModalOpen(contact.id),
            icon: () => <DeleteForever />,
            label: 'Remove'
          }
        ]
      }
    }
  ]

  return (
    <>
      <div className={classes.screenHeaderContainer}>
        <ScreenHeader text="Contacts" />
        <Button
          variant="contained"
          color="secondary"
          aria-label="Register User"
          className={classes.registerButton}
          size="small"
          component={Link}
          to="/contacts/register">
          Register Contact
        </Button>
      </div>
      {contacts && (
        <DataTable
          rowId="id"
          showLoadingIndicator={loading}
          columns={columns}
          data={contacts}
          itemCount={totalContacts}
          onChangePage={handleNewPageRequest}
        />
      )}
      <ConfirmationModal
        isOpen={modalOpen}
        description={'Do you really want to remove this contact'}
        title={'Remove contact'}
        onConfirm={handleDeleteContact}
        onCancel={handleCloseModal}
      />
    </>
  )
}

export default ListContacts
