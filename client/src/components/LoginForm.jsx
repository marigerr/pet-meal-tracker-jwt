import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';


const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user
}) => (
    <div className="column is-half">
      <form action="/" onSubmit={onSubmit}>
        <h2 className="title">Login</h2>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errors.summary && <p className="error-message">{errors.summary}</p>}

        <div className="field">
          <label id="email" className="label">Email</label>
          <div className="control">
            <input type="text" name="email" value={user.email} className="input" onChange={onChange} />
          </div>
        </div>

        <div className="field">
          <label id="password" className="label">Password</label>
          <div className="control">
            <input type="text" name="password" value={user.password} className="input" onChange={onChange} />
          </div>
        </div>

        <input type="submit" value="Log in" className="button is-success" />

        <p>Don't have an account? <Link to={'/signup'}>Create one</Link>.</p>
      </form>
    </div>
  );

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
