import React, { Component } from 'react';
import 'isomorphic-fetch';

export default class Home extends Component {
    static async getInitialProps() {
        try {
            const response = await fetch('http://localhost:8090/api/transformers');
            const transformers = await response.json();
            return { transformers };
        } catch(error) {
            console.log({error});
        }
    }

    render() {
        const { transformers } = this.props;

        return (
            <>
                <h1>Transformers</h1>
                {transformers.map(({ name, faction, id }) => (
                    <p key={id}>
                        {name}, {faction}
                    </p>
                ))}
            </>
        );
    }
}
