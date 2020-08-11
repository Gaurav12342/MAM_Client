import React from 'react'
import { Spin } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const SpinnerLoader = () => {
    return (
        <div key={uuidv4()} >
            <Spin size="large" style={{ paddingTop: '600px' }} >Loading.....</Spin>
        </div>

    )
}

export default SpinnerLoader;