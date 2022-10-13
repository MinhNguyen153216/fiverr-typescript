import React from 'react'

type Props = {}

export default function Login({}: Props) {
  return (
    <div className='container'>
      <div>
      
          <h3>Sign In to Fiverr</h3>
          <form className='form-group'>
            <div className="form-control">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" />
            </div>
            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" />
            </div>
            <div className="form-control">
              <button>Register</button>
              <button>Sign in</button>
            </div>
          </form>
       
      </div>
    </div>
  )
}