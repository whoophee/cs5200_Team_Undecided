import React from 'react';
import { Layout, Spin } from 'antd';
import QuestionPane from './question-pane';
import QuestionMenu from './question-menu';
import { WithLoader } from '../../util/api/loader';
import { getSectionWithQuestions, getUserType } from '../../../api/section';

class SectionPage extends React.Component {
    _renderSider() {
        const {sectionId, questionId, postId} = this.props.match.params;
        const posts = this.props.section.posts;
        const reload = this.props.reload;
        return <QuestionMenu reload={reload} sectionId={sectionId} questionId={questionId} postId={postId} posts={posts}/>
    }

    _renderContent() {
        const {sectionId, questionId, postId} = this.props.match.params;
        if (questionId == null) return "No Question Selected";
        return <QuestionPane sectionId={sectionId} questionId={questionId} postId={postId}/>;
    }
    render() {
        
        return (
            <Layout style={{backgroundColor: '#fff'}}>
                <Layout.Sider width={300} height="100%" style={{backgroundColor: '#fff', overflowY: 'hidden'}}>
                    {this._renderSider()}
                </Layout.Sider>
                <Layout.Content style={{overflowY: 'scroll'}}>
                    {this._renderContent()}
                </Layout.Content>
            </Layout>
        );
    }
}

export default WithLoader(getSectionWithQuestions, {
    mapLoadToProps: (section) => ({section}),
    loadArg: (props) => props.match.params.sectionId
})(SectionPage);