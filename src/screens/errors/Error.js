import React from 'react'

const Error = ({code, message, level}) => (
  <div className="row justify-content-center mt-3">
      <div className={`alert alert-${level} mt-5`} role="alert">
        <i className="fa fa-warning mr-1"></i> <strong>{code}</strong> {message}
    </div>
  </div> 
)

Error.defaultProps = {
  level: 'warning',
  message: 'An error ocurred'
}

const Forbidden = () => (<Error level="warning" code="403" message="You are not logged in to access this area" />)
const NotFound = () => (<Error level="dark" code="404" message="Page not found" />)

export { Error, Forbidden, NotFound }