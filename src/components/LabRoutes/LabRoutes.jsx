import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import labs from '~/labs/labsData'
import LabShowcase from '../LabShowcase/LabShowcase'
import Loading from '../Loading/Loading'


function LabRoutes({ labs }) {
  const getRoutes = () => (
    labs.map(lab => (
      <Route
        key={lab.urlPath}
        path={`/${lab.urlPath}`}
        component={lab.component}
      />
    ))
  )

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path='/' component={LabShowcase} />
        {getRoutes()}
      </Switch>
    </Suspense>
  )
}

LabRoutes.propTypes = {
  labs: PropTypes.arrayOf(PropTypes.object),
  pathname: PropTypes.string,
}

const mapStateToProps = () => ({ labs })

export default connect(mapStateToProps)(LabRoutes)
