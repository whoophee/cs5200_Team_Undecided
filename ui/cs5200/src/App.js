import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import login from './component/page/login/index';
import register from './component/page/register/index';
import school from './component/page/school-home/index';
import conversations from './component/page/conversations/index';
import sections from './component/page/section/index';
import student from './component/page/student-home/index';
import './App.css';
import { Layout, Menu } from 'antd';

class App extends Component {
  render() {
    return (
      <Router>
        <Layout style={{minHeight: '100%'}}>
          <Layout.Header>
            
          </Layout.Header>
          <Route path="/" exact render={() => "Home"}/>
          <Route path="/school/" component={school}/>
          <Route path="/login/" component={login}/>
          <Route path="/register/" component={register}/>
          <Route path="/conversations/" component={conversations}/>
          <Route path="/sections/:sectionId/:questionId?/" exact component={sections}/>
          <Route path="/student/" component={student}/>
        </Layout>
      </Router>
    );
  }
}

export default App;
