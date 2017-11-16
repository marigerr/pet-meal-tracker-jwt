import React from 'react';
import { Link, IndexLink } from 'react-router';
import '../images/pawprintGreen.svg';


const Home = () => (
  <div>
    <section className="hero section">
      <div className="hero-body">
        <div className="container">
          <div className='flex-center'>
            <h1 className="title">
              Is your Pet eating enough or too little?
          </h1>
            <h2 className="subtitle">
              Track your pets calorie intake more easily
          </h2>
          </div>
        </div>
      </div>
    </section >
    <section className="section">
      <div className="container">
        <div className='flex-row-end'>
          <div>
            <h2 className="title">Get Started</h2>
            <Link to="/signup" className="is-success button">Sign up</Link>
            <Link to="/login" className="is-success button">Log in</Link>
          </div>
          <div>
            <img src="../images/pawprintGreen.svg" alt="pet-paw" height="300" width="300" />
          </div>
        </div>
      </div >
    </section >
  </div >
);

export default Home;
