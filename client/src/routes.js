import NavContainer from './containers/NavContainer.jsx';
import Home from './components/Home.jsx';
import Dashboard from './components/Dashboard.jsx';
import Track from './components/Track.jsx';
import Addfood from './components/Addfood.jsx';
import Stats from './components/Stats.jsx';
import Meals from './components/Meals.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import Auth from './modules/Auth';


const routes = {
  component: NavContainer,
  childRoutes: [
    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, Dashboard);
        } else {
          callback(null, Home);
        }
      }
    },
    {
      path: '/track',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, Track);
        } else {
          callback(null, LoginPage);
        }
      }
    }, 

    {
      path: '/addfood',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, Addfood);
        } else {
          callback(null, LoginPage);
        }
      }
    }, 

    {
      path: '/meals',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, Meals);
        } else {
          callback(null, LoginPage);
        }
      }
    },

    {
      path: '/stats',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, Stats);
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
