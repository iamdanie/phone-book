import React from 'react';

export default [
  {
    path: '/contacts',
    name: 'Contacts',
    component: React.lazy(() => import('contacts'))
  }
];
