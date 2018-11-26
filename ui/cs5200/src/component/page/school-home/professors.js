import React from 'react';
import { List, Button, Row, Icon, Avatar } from 'antd';
import Loader from '../../util/api/loader';
import { getProfessors } from '../../../api/professor';

function getColorForId(id) {
    return [
        '#000',
        '#f00',
        '#0f0',
        '#00f'
    ][id % 4];
}

const renderListItem = (professor) => {
    return (
        <List.Item>
            <List.Item.Meta
                avatar={
                    <Avatar
                        style={{verticalAlign: 'middle', backgroundColor: getColorForId(professor.id)}}>
                        {professor.name.charAt(0).toUpperCase()}
                    </Avatar>}
                title={professor.name}/>
        </List.Item>
    );
};

const ProfessorList = (props) => <List bordered dataSource={props.professors} renderItem={renderListItem}/>;

const mapSectionsToProps = (professors) => {
    return {professors};
};

export const Component = (props) => (
    <Loader load={props.loadProfessors} mapLoadToProps={mapSectionsToProps} reloadRef={props.reloadRef} component={ProfessorList}/>
);


const loadForUser = (props) => (
    <div>
        <Row>
            <h1>Professors</h1>
        </Row>
        <Row>
            <Component loadProfessors={getProfessors} {...props}/>
        </Row>
    </div>
);

export default loadForUser;