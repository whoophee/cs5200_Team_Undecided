import React from 'react';
import { Select } from 'antd';
import Loader from '../api/loader';
import { getClassesForMe } from '../../../api/class';

class Component extends React.Component {
    _loadClasses = async () => {
        return await getClassesForMe();
    }
    _mapLoadToProps = (loadedData) => {
        return {
            children: loadedData.map(item => 
                <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)
            };
    }
    render() {
        return <Loader mapLoadToProps={this._mapLoadToProps} load={this._loadClasses} component={Select} {...this.props}/>;
    }
}

export default Component;