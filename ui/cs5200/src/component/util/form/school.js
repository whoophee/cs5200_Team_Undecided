import React from 'react';
import { Select } from 'antd';
import Loader from '../api/loader';
import { getAllSchools } from '../../../api/school';

class Component extends React.Component {
    _loadSchools = async () => {
        return await getAllSchools();
    }
    _mapLoadToProps = (loadedData) => {
        return {
            children: loadedData.map(item => 
                <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)
            };
    }
    render() {
        return <Loader mapLoadToProps={this._mapLoadToProps} load={this._loadSchools} component={Select} {...this.props}/>;
    }
}

export default Component;