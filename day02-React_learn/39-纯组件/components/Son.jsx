import React, { Component,PureComponent } from 'react'

export default class Son extends PureComponent {
    state = {
        sex:'boy'
    }
    render() {
        console.log('Son render');
        let {count} = this.props;
        let {sex} = this.state;
        return (
            <div>
                <h4>Son</h4>
                <p>props count: {count}</p>
                <p>Son state sex: {sex}</p>
            </div>
        )
    }
}
