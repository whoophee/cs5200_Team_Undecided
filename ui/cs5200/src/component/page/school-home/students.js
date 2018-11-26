import React from 'react';
import { List, Button, Row, Icon, Avatar } from 'antd';
import Loader from '../../util/api/loader';
import { getStudentsForMe } from '../../../api/student';

function getColorForId(id) {
    return [
        '#000',
        '#f00',
        '#0f0',
        '#00f'
    ][id % 4];
}

const renderListItem = (student) => {
    return (
        <List.Item>
            <List.Item.Meta
                avatar={
                    <Avatar
                        style={{verticalAlign: 'middle', backgroundColor: getColorForId(student.id)}}>
                        {student.name.charAt(0).toUpperCase()}
                    </Avatar>}
                title={student.name}/>
        </List.Item>
    );
};

const StudentList = (props) => <List bordered dataSource={props.students} renderItem={renderListItem}/>;

const mapSectionsToProps = (students) => {
    return {students};
};

export const Component = (props) => (
    <Loader load={props.loadStudents} mapLoadToProps={mapSectionsToProps} reloadRef={props.reloadRef} component={StudentList}/>
);


const loadForUser = (props) => (
    <div>
        <Row>
            <h1>Students</h1>
        </Row>
        <Row>
            <Component loadStudents={getStudentsForMe} {...props}/>
        </Row>
    </div>
);

export default loadForUser;