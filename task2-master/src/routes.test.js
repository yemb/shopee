import React from 'react'
import ReactDOM from 'react-dom'
import Route from './routes'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Route />, div)
  ReactDOM.unmountComponentAtNode(div)
})
