import React from 'react';
import { Layout, Button, Input, Icon } from 'antd';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    _handleSearch = (e) => {
        this.props.history.push('/companies/?q=' + encodeURI(e.target.value || ''))
    };
    render() {
        return (
            <Layout>
                <Layout.Content style={{padding: '24px 10px', margin: '0 100px', backgroundColor: '#fff'}}>
                    <div style={{width: '100%'}}>
                        <div style={{display: 'flex', width: '100%', alignItems: 'center', flexDirection: 'column'}}>
                            <h1 style={{color: '#222'}}>The super simple, wholly priceless, question and answer website</h1>
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
                            <Button type="primary" style={{width: '400px', height: '50px', display: 'inline-block'}}><Link to="/register/">Register Here</Link></Button>
                            {" Or "}
                            <Button type="primary" style={{width: '400px', height: '50px', display: 'inline-block'}}><Link to="/login/">Login</Link></Button>
                            </div>
                            
                            <br/>
                            <h2>Just browsing? Search for companies here:</h2>
                            <div style={{padding: '0 30px', width: '100%'}}>
                                <Input placeholder="company name" onPressEnter={this._handleSearch}/>
                            </div>
                            
                        </div>
                    </div>
                    
                </Layout.Content>
            </Layout>
        );
    }
}

export default Home;