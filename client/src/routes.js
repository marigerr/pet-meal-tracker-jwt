import NavContainer from './components/NavContainer.jsx';
import HomePage from './components/HomePage.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import TrackPage from './containers/TrackPage.jsx';
import AddfoodPage from './containers/AddfoodPage.jsx';
import StatsPage from './containers/StatsPage.jsx';
import MealsPage from './containers/MealsPage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import Auth from './modules/Auth';


const routes = {
  // base component (wrapper for the whole application).
  component: NavContainer,
  childRoutes: [

    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, DashboardPage);
        } else {
          callback(null, HomePage);
        }
      }
    },
    {
      path: '/track',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, TrackPage);
        } else {
          callback(null, LoginPage);
        }
      }
    }, 

    {
      path: '/addfood',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, AddfoodPage);
        } else {
          callback(null, LoginPage);
        }
      }
    }, 

    {
      path: '/meals',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, MealsPage);
        } else {
          callback(null, LoginPage);
        }
      }
    },

    {
      path: '/stats',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, StatsPage);
        } else {
          callback(null, LoginPage);
        }
      }
    },     

    {
      path: '/login',
      component: LoginPage
    },

    {
      path: '/signup',
      component: SignUpPage
    },

    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();

        // change the current URL to /
        replace('/');
      }
    }

  ]
};

export default routes;
