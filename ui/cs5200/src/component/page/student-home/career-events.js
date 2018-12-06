import React from 'react';
import { getCareerEventsForMe } from '../../../api/career-events';
import { WithLoader } from '../../util/api/loader';
import { List } from 'antd';
import { Link } from 'react-router-dom';

const Component = props => (
    <List bordered>
        {props.events.map(event => (
            <List.Item>
                <Link to={"/events/" + event.id + "/"}>
                    {event.company.name}
                    {' - '}
                    {event.name}
                </Link>
            </List.Item>
        ))}
    </List>
);

export default WithLoader(getCareerEventsForMe, {
    mapLoadToProps: (events) => ({events})
})(Component);

