import React from 'react';
import { GridLoader } from 'react-spinners';

class Loader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    render() {
        return (
            <div>
                <GridLoader
                    sizeUnit={"px"}
                    size={30}
                    color={'#1e8bbd'}
                    loading={this.state.loading}
                />
            </div> 
        )
    }

}

export default Loader;