// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import CounterRoute from './Counter'
import EventRoute from './Event'
import LoginRoute from './Login'

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    const { user } = store.getState()
    if (!user.loggedIn) {
      replace('login')
    }
    cb()
  }

  const requirePublic = (nextState, replace, cb) => {
    const { user } = store.getState()
    if (user.loggedIn) {
      replace('/')
    }
    cb()
  }

  return ({
    path: '/',
    component: CoreLayout,
    indexRoute: Home,
    childRoutes: [
      {
        onEnter: requireLogin,
        childRoutes: [
          CounterRoute(store),
          // EventRoute(store),
        ]
      },
      {
        onEnter: requirePublic,
        childRoutes: [
          LoginRoute(store),
          EventRoute(store),
        ]
      }
    ]
  })
}
/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */
//
// export const createRoutes = (store) => ({
//   path        : '/',
//   component   : CoreLayout,
//   indexRoute  : Home,
//   childRoutes : [
//     CounterRoute(store),
//     EventRoute(store)
//
//   ]
// })

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

// export default createRoutes
