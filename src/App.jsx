import React from 'react'

import LabShowcase from './components/LabShowcase/LabShowcase'
import withAppRoot from './components/library/withAppRoot'
import withAppShell from './components/library/withAppShell'
import labs from './labs/labsData'
import appStore from './reducers'


function App() {
  return <LabShowcase labs={labs} />
}

export default withAppRoot(withAppShell(App), appStore)
