import React from 'react';
import { Select } from 'antd';
import Loader from '../api/loader';
import { getProfessors } from '../../../api/professor';

class Component extends React.Component {
    _loadProfessors = async () => {
        return await getProfessors();
    }
    _mapLoadToProps = (loadedData) => {
        return {
            children: loadedData.map(item => 
                <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)
            };
    }
    render() {
        return <Loader mapLoadToProps={this._mapLoadToProps} load={this._loadProfessors} component={Select} {...this.props}/>;
    }
}

export default Component;