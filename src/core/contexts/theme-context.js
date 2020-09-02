import React from 'react'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#89609e'
    },
    secondary: {
      main: '#a86cc1'
    }
  }
})

export function ThemeProvider({children}) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}
