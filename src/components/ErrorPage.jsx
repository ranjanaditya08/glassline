import React from 'react'
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-12 text-center">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/" className="btn btn-primary mt-3">
          Go to Home
        </Link>
      </div>
    </div>
  )
}

export default ErrorPage