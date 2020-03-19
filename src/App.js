
import React, { useState, useEffect } from 'react';
import { firestore } from './index'
import Task from './Task'
import { Layout, Menu } from 'antd';
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
} from '@ant-design/icons';

const { Header, Content, Sider, Footer } = Layout;

const FS = () => {
  const [tasks, setTasks] = useState([])
  const [name, setName] = useState('')

  const retriveData = () => {
    firestore.collection("tasks").orderBy('id', 'asc').onSnapshot(snapshot => {
      let myTask = snapshot.docs.map(d => {
        const { id, name } = d.data()
        return { id, name }
      })
      setTasks(myTask)
    })
  }

  useEffect(() => {
    retriveData()
  }, [])

  const addTask = async () => {
    let id = (tasks.length === 0) ? 1 : tasks[tasks.length - 1].id + 1
    firestore.collection("tasks").doc(id + '').set({ id, name })
  }

  const removeTask = (id) => {
    firestore.collection("tasks").doc(id + '').delete()
  }

  const editTask = (id) => {
    firestore.collection("tasks").doc(id + '').set({ id, name })
  }

  const renderTask = () => {
    if (tasks && tasks.length) {
      return tasks.map((task, index) => (
        <Task key={index}
          task={task}
          editTask={editTask}
          removeTask={removeTask} />
      ))
    }
    else {
      return <div>No Task</div>
    }
  }

  return (
    <Layout style={{ height: "100%" }}>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >

            <Menu.Item key="1">Home</Menu.Item>
            <Menu.Item key="2">User</Menu.Item>
            <Menu.Item key="3">Forum</Menu.Item>

          </Menu>
        </Header>
      </Layout>
      <Layout>
        <Sider height="100%" className="site-layout-background">
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
          >
            <Menu.Item key="1">
              <PieChartOutlined />
              <span>Home</span>
            </Menu.Item>
            <Menu.Item key="2">
              <DesktopOutlined />
              <span>User</span>
            </Menu.Item>
            <Menu.Item key="3">
              <ContainerOutlined />
              <span>Forum</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <div>
            <h2 style={{ margin: "40px" }}>Todo: </h2>
            <input style={{ margin: "0px 0px 40px 40px" }} type="text" name="name" onChange={(e) => setName(e.target.value)} />
            <button onClick={addTask}>Submit</button> <br />
            <div className="Card-Warp">
              <ul style={{ display: 'flex', listStyle: 'none' }}> {renderTask()}</ul>
            </div>
          </div>

        </Content>
      </Layout>
      <Layout>
        <Footer style={{ height: "100%", marginBottom: 0 }}>
          Thanks Antd
        </Footer>
      </Layout>
    </Layout>
  )
}

export default FS;
