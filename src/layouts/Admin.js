import React from 'react'
import PerfectScrollbar from 'perfect-scrollbar'
import { Route, Switch, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import DemoNavbar from 'components/Navbars/DemoNavbar.js'
import Footer from 'components/Footer/Footer.js'
import Sidebar from 'components/Sidebar/Sidebar.js'
// import FixedPlugin from 'components/FixedPlugin/FixedPlugin.js'

import routes from 'routes.js'

var ps

function Dashboard(props) {
  const [backgroundColor] = React.useState('white')
  const [activeColor] = React.useState('info')

  const mainPanel = React.useRef()
  const location = useLocation()
  const { user } = useSelector((state) => state.authReducer)

  React.useEffect(() => {
    if (!user) {
      props.history.push('/')
    }
  }, [user, props.history])

  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel.current)
      document.body.classList.toggle('perfect-scrollbar-on')
    }
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy()
        document.body.classList.toggle('perfect-scrollbar-on')
      }
    }
  })

  React.useEffect(() => {
    mainPanel.current.scrollTop = 0
    document.scrollingElement.scrollTop = 0
  }, [location])

  // const handleActiveClick = (color) => {
  //   setActiveColor(color)
  // }

  // const handleBgClick = (color) => {
  //   setBackgroundColor(color)
  // }

  return (
    <div className='wrapper'>
      <Sidebar
        {...props}
        routes={routes}
        bgColor={backgroundColor}
        activeColor={activeColor}
      />
      <div className='main-panel' ref={mainPanel}>
        <DemoNavbar {...props} />
        <Switch>
          {routes.map((prop, key) => {
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
                exact
              />
            )
          })}
        </Switch>
        <Footer fluid />
      </div>
      {/* <FixedPlugin
        bgColor={backgroundColor}
        activeColor={activeColor}
        handleActiveClick={handleActiveClick}
        handleBgClick={handleBgClick}
      /> */}
    </div>
  )
}

export default Dashboard
