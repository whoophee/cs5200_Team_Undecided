import React from 'react';
import { Layout } from 'antd';
import CareerEvents from './career-events';
import CompanyProfile from './company-profile';

class CompanyHome extends React.Component {
    render() {
        return (
            <Layout style={{padding: '24px 20px', margin: '0 100px', backgroundColor: '#fff'}}>
                <Layout.Content>
                    <CompanyProfile/><br/>
                    <CareerEvents/>
                </Layout.Content>
            </Layout>
        )
    }
}

export default CompanyHome;