import React from 'react';
import { Layout, Row, AutoComplete, Button, List } from 'antd';
import { WithLoader } from '../../util/api/loader';
import { getSectionsForMe, getSectionsByName, enrollMeInSection } from '../../../api/section';
import { Link } from "react-router-dom";

class StudentHome extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchSections: [],
            selectedSection: null,
            loading: false
        };
    }
    _renderSection = (section) => {
        return (
            <List.Item key={section.id}>
                <Link to={"/sections/" + section.id + '/'}>
                    {[section.schoolClass.courseNumber, section.schoolClass.name, section.name].join(' ')}
                    -
                    {section.professor.name}
                </Link>
            </List.Item>
        );
    };
    _renderMySections() {
        return (
            <Row>
                <List>
                    {this.props.sections.map(this._renderSection)}
                </List>
            </Row>
        );
    }
    _handleSearchSection = (value) => {
        getSectionsByName(value).then(result => {
            this.setState({
                searchSections: result
                    .filter(item => {
                        return this.props.sections.map(section => section.id).indexOf(item.id) === -1
                    }).map(item => ({
                        value: item.id,
                        text: [item.schoolClass.courseNumber, item.schoolClass.name, item.name, item.professor.name].join(' ')
                    }))
            });
        });
    }
    _handleSelectSection = (value) => {
        this.setState({
            selectedSection: value
        });
    };
    _handleRegister = (e) => {
        if (this.state.selectedSection == null) return;
        enrollMeInSection(parseInt(this.state.selectedSection)).then(() => {
            this.setState({
                loading: true
            }, () => {
                this.props.reload().then(() => {
                    this.setState({
                        loading: false
                    });
                });
            });
        });
    };
    _renderSectionRegister() {
        return (
            <Row type="flex">
                <AutoComplete
                    dataSource={this.state.searchSections}
                    style={{flexGrow: 1}}
                    onSelect={this._handleSelectSection}
                    onSearch={this._handleSearchSection}
                    placeholder="Section Name"/>
                <Button onClick={this._handleRegister} disabled={this.state.selectedSection == null}>
                    Register
                </Button>
            </Row>
        );
    }
    render() {
        return (
            <Layout>
                <Layout.Content>
                    {this._renderSectionRegister()}
                    {this._renderMySections()}
                </Layout.Content>
            </Layout>
        )
    }
}

export default WithLoader(getSectionsForMe, {
    mapLoadToProps: (sections) => ({sections})
})(StudentHome);