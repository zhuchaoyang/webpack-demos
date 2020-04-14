import React, { Component } from 'react'
import { connect } from 'dva'

@connect(({ user }) => ({
  // userInfo: user.userInfo,
}))

class App extends Component {
  componentDidMount(){
  }
 

  render(){
    let ps = this.props;
    let dom = null;

    dom = ps.children;

    return (
      <div id="root-wrapper-mobile">
        {dom}
        {/*<BackTop title="回到顶部"></BackTop>*/}
      </div>
    )
  }
}


export default App
