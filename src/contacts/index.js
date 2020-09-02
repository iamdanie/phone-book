import React from 'react';
import { Route } from 'react-router-dom';

const createNestedRoutes = contactsPath => [
  {
    path: contactsPath,
    exact: true,
    component: React.lazy(() => import('./list-contacts'))
  },
  {
    path: `${contactsPath}/register`,
    component: React.lazy(() => import('./register-contact'))
  }
];

function Contacts({ match }) {
  const routes = createNestedRoutes(match.path);

  return routes.map(({ path, exact = false, component }) => (
    <Route key={path} path={path} exact={exact} component={component} />
  ));
}

export default Contacts;
