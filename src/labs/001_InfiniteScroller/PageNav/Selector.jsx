import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'


const Root = styled.div`
  padding: 20px 0 40px;
  display: flex;
  flex-direction: column;

  label {
    display: block;
    padding-bottom: 5px;
  }

  select {
    background-color: ${({ theme }) => theme.colors.field.background};
  }
`

function Selector({ label, keys, titles, selected, onChange }) {
  const renderOptions = () => {
    return keys.map((key, i) => (
      <option
        key={key}
        value={key.toString()}
      >
        {titles[i]}
      </option>
    ))
  }

  return (
    <Root>
      <label htmlFor='scroller-type'>{label}</label>
      <select
        id='scroller-type'
        value={selected}
        onChange={(event) => onChange(event.target.value)}
      >
        {renderOptions()}
      </select>
    </Root>
  )
}

Selector.propTypes = {
  label: PropTypes.string.isRequired,
  keys: PropTypes.array.isRequired,
  titles: PropTypes.array.isRequired,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
}

export default Selector
