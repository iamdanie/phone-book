import React from 'react'
import {Redirect, useHistory} from 'react-router-dom'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  makeStyles
} from '@material-ui/core'
import {ScreenHeader} from 'core/components'
import {useSnackbar} from 'core/contexts/snackbar-context'
import {useSelector, useDispatch} from 'react-redux'
import {registerContact} from 'core/redux/actions'
import ConfirmationModal from 'core/components/confirmation-modal'

const useStyles = makeStyles(({mixins, palette, spacing}) => ({
  actionsContainer: {
    display: 'flex'
  },
  cancelButton: {
    marginRight: spacing(2)
  },
  createButtonWrapper: {
    position: 'relative'
  },
  createButton: {
    color: palette.common.white
  },
  createButtonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  paper: {
    ...mixins.gutters(),
    paddingTop: spacing(2),
    paddingBottom: spacing(2),
    marginTop: spacing(3)
  },
  screenHeaderContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  }
}))

const initialValues = {
  firstName: '',
  lastName: '',
  phone: ''
}

const schema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  phone: Yup.number()
    .typeError('Please, add only numbers')
    .test('len', 'Your phone must be between 10 and 15 digits long', val => {
      if (val) {
        const length = val.toString().length
        return length >= 10 && length <= 15
      }
      return false
    })
    .required('Required')
})

export default function RegisterContact() {
  const [cancel, setCancel] = React.useState(false)
  const [modalOpen, setModalOpen] = React.useState(false)

  const history = useHistory()
  const dispatch = useDispatch()
  const loading = useSelector(state => state.loading)
  const classes = useStyles()
  const snackbar = useSnackbar()

  const handleOnCancel = () => {
    setModalOpen(false)
    setCancel(true)
  }

  const createUser = async payload => dispatch(registerContact(payload))

  const handleOnSubmit = async values => {
    const payload = {...values}
    try {
      await createUser(payload)
      snackbar('Contact successfully Created.')
      history.push('/contacts')
    } catch (err) {
      snackbar(
        `Error: ${err.error ||
          'Something went wrong trying to register your contact'}`
      )
    }
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const handleModalOpen = () => setModalOpen(true)

  return cancel ? (
    <Redirect to="/contacts" />
  ) : (
    <Container maxWidth="md">
      <ConfirmationModal
        isOpen={modalOpen}
        description={
          'Do you really want to cancel creating? All changes will be lost'
        }
        title={'Register contact'}
        onConfirm={handleOnCancel}
        onCancel={handleCloseModal}
      />
      <Formik
        initialValues={initialValues}
        onSubmit={handleOnSubmit}
        validationSchema={schema}>
        {({
          dirty,
          errors,
          handleBlur,
          handleChange,
          isValid,
          submitForm,
          touched,
          values
        }) => (
          <>
            <div className={classes.screenHeaderContainer}>
              <ScreenHeader
                text="Register Contact"
                previous={{route: '/contacts', text: 'Contacts'}}
              />
              <div className={classes.actionsContainer}>
                <Button
                  className={classes.cancelButton}
                  variant="text"
                  color="primary"
                  aria-label="Cancel"
                  disabled={loading}
                  onClick={handleModalOpen}>
                  Cancel
                </Button>
                <div className={classes.createButtonWrapper}>
                  <Button
                    className={classes.createButton}
                    variant="contained"
                    color="secondary"
                    aria-label="Register"
                    disabled={!dirty || !isValid || loading}
                    onClick={submitForm}>
                    {loading ? 'Registering' : 'Register'}
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={classes.createButtonProgress}
                    />
                  )}
                </div>
              </div>
            </div>
            <Paper className={classes.paper}>
              <TextField
                id="firstName"
                name="firstName"
                label="First Name"
                variant="outlined"
                margin="normal"
                value={values.firstName}
                onChange={handleChange}
                inputProps={{
                  onBlur: handleBlur
                }}
                error={errors.firstName && touched.firstName}
                helperText={touched.firstName && errors.firstName}
                required
                fullWidth
              />
              <TextField
                id="lastName"
                name="lastName"
                label="Last Name"
                variant="outlined"
                margin="normal"
                value={values.lastName}
                onChange={handleChange}
                inputProps={{
                  onBlur: handleBlur
                }}
                error={errors.lastName && touched.lastName}
                helperText={touched.lastName && errors.lastName}
                required
                fullWidth
              />
              <TextField
                id="phone"
                name="phone"
                label="Phone Number"
                variant="outlined"
                margin="normal"
                value={values.phone}
                onChange={handleChange}
                inputProps={{onBlur: handleBlur}}
                error={errors.phone && touched.phone}
                helperText={touched.phone && errors.phone}
                required
                fullWidth
              />
            </Paper>
          </>
        )}
      </Formik>
    </Container>
  )
}
