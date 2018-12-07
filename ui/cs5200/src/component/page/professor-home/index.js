import React from 'react';
import SectionPage from '../school-home/sections';
import { NeedsUser } from '../../util/datastore/user';
import { Layout } from 'antd';

export default NeedsUser(['professor'])((props) => {
    return (
        <Layout style={{padding: '24px 0px', margin: '0 100px', backgroundColor: '#fff'}}>
            <Layout.Content>
                <SectionPage professor={props.user}/>
            </Layout.Content>
        </Layout>
    );
});