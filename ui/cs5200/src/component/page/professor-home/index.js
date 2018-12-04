import React from 'react';
import SectionPage from '../school-home/sections';
import { NeedsUser } from '../../util/datastore/user';
import { Layout } from 'antd';

export default NeedsUser(['professor'])((props) => {
    return (
        <Layout>
            <Layout.Content>
                <SectionPage professor={props.user}/>
            </Layout.Content>
        </Layout>
    );
});