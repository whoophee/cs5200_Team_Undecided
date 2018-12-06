import React from 'react';
import { Layout, List, Input } from 'antd';
import { WithLoader } from '../../util/api/loader';
import { searchCompanies } from '../../../api/company';
import { Link } from 'react-router-dom';
import qs from 'qs';

class CompanySearch extends React.Component {
    _renderSearchResults() {
        return (
            <List size="large" itemLayout="vertical" bordered loading={this.props.loadStatus === 'loading'}>
                {this.props.companies.map(company => {
                    return (
                        <List.Item
                            key={company.id}
                            extra={<img width={220} src="https://d1b10bmlvqabco.cloudfront.net/company/vmware/company_pic/1454537863_120.jpg"/>}>
                            <List.Item.Meta
                                title={<Link to={"/companies/" + company.id + "/"}>{company.name}</Link>}
                                description={company.headquartersText}/>
                            {company.description}
                        </List.Item>
                    );
                })}
            </List>
        );
    }
    render() {
        return (
            <Layout>
                <Layout.Content style={{padding: '24px 10px', margin: '0 100px', backgroundColor: '#fff'}}>
                    <h2>Search Results</h2><hr/>
                    {this._renderSearchResults()}
                </Layout.Content>
            </Layout>
        );
    }
}

export default WithLoader(searchCompanies, {
    loadArg: (props) => {
        return (qs.parse(props.location.search, {ignoreQueryPrefix: true}).q)
    },
    mapLoadToProps: (companies) => ({companies})
})(CompanySearch);