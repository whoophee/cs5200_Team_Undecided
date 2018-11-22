import React from 'react';
import { List, Button, Row, Icon } from 'antd';
import Loader from '../../util/api/loader';
import { getSectionsForMe } from '../../../api/section';

const renderListItem = (curSection) => {
    return (
        <List.Item>
            <List.Item.Meta
                title={[
                    curSection.schoolClass.name,
                    'Professor ' + curSection.professor.name,
                    curSection.name
                ].join(' - ')}
                description={curSection.description}/>
        </List.Item>
    );
};

const SectionsList = (props) => <List bordered dataSource={props.sections} renderItem={renderListItem}/>;

const mapSectionsToProps = (sections) => {
    return {sections};
};

export const Component = (props) => (
    <Loader load={props.loadSections} mapLoadToProps={mapSectionsToProps} reloadRef={props.reloadRef} component={SectionsList}/>
);


const loadForUser = (props) => (
    <div>
        <Row>
            <h1>Sections</h1>
        </Row>
        <Row>
            <Component loadSections={getSectionsForMe} {...props}/>
        </Row>
    </div>
);

export default loadForUser;