import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import LabShowcase from '../LabShowcase/LabShowcase'
import Loading from '../Loading/Loading'


function LabRoutes({ labs }) {
  const renderLabRoutes = () => (
    labs.map(lab => (
      <Route
        key={lab.urlPath}
        path={`${lab.urlPath}`}
        component={lab.component}
      />
    ))
  )

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path='/' component={() => <LabShowcase labs={labs} />} />
        {renderLabRoutes()}
      </Switch>
    </Suspense>
  )
}

LabRoutes.propTypes = {
  labs: PropTypes.arrayOf(PropTypes.object),
}

export default LabRoutes
