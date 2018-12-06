import React from 'react';
import { Layout, Button, Input, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { WithUser, getUserType } from '../../util/datastore/user';
import { Redirect } from 'react-router-dom';

class Home extends React.Component {
    _handleSearch = (value) => {
        this.props.history.push('/companies/?q=' + encodeURI(value || ''))
    };
    render() {
        return (
            <Layout>
                {getUserType(this.props.user) === 'student' && <Redirect to="/student/"/>}
                {getUserType(this.props.user) === 'professor' && <Redirect to="/professor/"/>}
                {getUserType(this.props.user) === 'company' && <Redirect to="/company/"/>}
                {getUserType(this.props.user) === 'school' && <Redirect to="/school/"/>}
                <Layout.Content style={{padding: '24px 10px', margin: '0 100px', backgroundColor: '#fff'}}>
                    <div style={{width: '100%'}}>
                        <div style={{display: 'flex', width: '100%', alignItems: 'center', flexDirection: 'column'}}>
                            <h1 style={{color: '#222'}}>The super simple, entirely priceless, question and answer website</h1>
                            <h2 style={{color: '#888'}}>Use less time and assist students in learning using the power of classroom</h2>
                            <h3>You Can...</h3>
                            <div style={{display: 'flex'}}>
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 10px'}}>
                                    <Icon type="question-circle" style={{fontSize: '200px'}}></Icon>
                                    <br/>
                                    <h3>Ask Questions</h3>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 10px'}}>
                                    <Icon type="team" style={{fontSize: '200px'}}></Icon>
                                    <br/>
                                    <h3>Connect with Companies</h3>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 10px'}}>
                                    <Icon type="message" style={{fontSize: '200px'}}></Icon>
                                    <br/>
                                    <h3>Message your Professors</h3>
                                </div>
                                
                            </div>
                            <h2>Are you a student, professor, school, or company?</h2>
                            <div>
                            <Button type="primary" style={{width: '400px', height: '50px', display: 'inline-block'}}><Link to="/login/">Log In</Link></Button>
                            {" Or "}
                            <Button type="primary" style={{width: '400px', height: '50px', display: 'inline-block'}}><Link to="/register/">Register Now</Link></Button>
                            </div>
                            
                            <br/>
                            <h2>Just browsing? Search for companies here:</h2>
                            <div style={{padding: '0 30px', width: '100%'}}>
                                <Input.Search placeholder="Search for Companies!" onSearch={this._handleSearch}/>
                            </div>
                            
                        </div>
                    </div>
                    
                </Layout.Content>
            </Layout>
        );
    }
}

export default WithUser(Home);