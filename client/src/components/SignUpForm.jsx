import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';


const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
    <div className="container">
      <form action="/" onSubmit={onSubmit}>
        <h2 className="title">Sign Up</h2>

        {errors.summary && <p className="error-message">{errors.summary}</p>}

        <div className="field">
          <label id="name" className="label">Name</label>
          <div className="control">
            <input type="text" name="name" value={user.name} className="input" onChange={onChange} />
          </div>
        </div>

        <div className="field">
          <label id="email" className="label">Email</label>
          <div className="control">
            <input type="text" name="email" value={user.email} className="input" onChange={onChange} />
          </div>
        </div>

        <div className="field">
          <label id="password" className="label">Password</label>
          <div className="control">
            <input type="password" name="password" value={user.password} className="input" onChange={onChange} />
          </div>
        </div>

        <input type="submit" value="Create New Account" className="button is-success" />

        <p>Already have an account? <Link to={'/login'}>Log in</Link></p>
      </form>
    </div>
  );

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;

