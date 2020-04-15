import React, { Component } from 'react'
import { connect } from 'dva'
import styles from './index.scss'

import { Button } from 'antd' 


console.log('styles',styles);
console.warn('styles', '警告');
console.error('styles', '错误');




@connect(({ user, home }) => ({

}))


class App extends Component {


  render(){
    return (
      <div className={styles.page}>
        <div className="layout">
          <div className="layout-header">我是3header</div>
          <Button>默认</Button>

        </div>
      </div>
    )
  }
}

export default App;