import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'

import styles from './HomePage.less'
import ChargeManagement from '../charageManagement/CharageManagement'

const { Header, Content, Footer } = Layout

class HomePage extends React.Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
    }
    render() {
        return (
            <Layout className="layout">
                <Header>
                    <div className={styles['logo']}>
                    </div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['reservation']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="reservation">预约及收入详情</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <div style={{ background: '#fff', padding: 24, margin: "30px 0", minHeight: 480 }}>
                        <ChargeManagement/>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                  charage_management ©2018 Created by LGZ
                </Footer>
            </Layout>
        )
    }
}

export default HomePage