import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { connect } from 'react-redux'


const Root = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 30px 10px;
`

const Text = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
`

function ScrollerStatus({ entryCount, isFetching }) {
  const renderIsFetching = () => isFetching ? 'fetching...' : null

  return (
    <Root>
      <Text>Records: {entryCount}</Text>
      <Text>{renderIsFetching()}</Text>
    </Root>
  )
}

ScrollerStatus.propTypes = {
  entryCount: PropTypes.number,
  isFetching: PropTypes.bool,
}

const mapStateToProps = ({ entryCount, isFetching }) => ({ entryCount, isFetching })

export default connect(mapStateToProps)(ScrollerStatus)
