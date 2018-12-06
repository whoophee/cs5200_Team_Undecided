import React from 'react';
import { Layout, Card } from 'antd';
import { WithLoader } from '../../util/api/loader';
import { getCompanyWithCareerEvents } from '../../../api/company';


class CompanyProfile extends React.Component {
    render() {
        const company = this.props.company;

        return (
            <Layout>
                <Layout.Content style={{padding: '24px 10px', margin: '0 100px', backgroundColor: '#fff', maxWidth: '100%', overflowY: 'scroll'}}>
                    <Card>
                        <Card.Meta
                            title={<h1>{company.name}</h1>}
                            description={
                                <div>
                                    Headquarters: {company.headquartersText}<br/>
                                    Size: {company.size}<br/>
                                    Industry: {company.industry}
                                </div>
                            }/>
                        <br/>
                        <h2>About</h2>
                        <div style={{}}>{company.description}</div>
                    </Card>
                    
                </Layout.Content>
            </Layout>
        );
    }
}

export default WithLoader(getCompanyWithCareerEvents, {
    loadArg: props => props.match.params.id,
    mapLoadToProps: (company) => ({company})
})(CompanyProfile);