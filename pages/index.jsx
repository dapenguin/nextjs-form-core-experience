import React, { Component } from 'react';
import Router from 'next/router';
import serialize from 'form-serialize';
import 'isomorphic-fetch';

export default class Home extends Component {
    constructor() {
        super();

        this.formRef = React.createRef();
    }

    static async getInitialProps() {
        try {
            const response = await fetch('http://localhost:8090/api/transformers');
            const transformers = await response.json();
            return { transformers };
        } catch(error) {
            console.log({error});
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const formData = serialize(this.formRef.current, { hash: true });
        try {
            const response = await fetch('http://localhost:8090/api/transformers', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            });

            if (!response.ok) {
                throw 'Error forging transformer.'
            }

            Router.push('/');
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
                <h2>Forge a new transformer</h2>
                <form action="/api/transformers" method="POST" onSubmit={this.handleSubmit} ref={this.formRef}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" autoComplete="off" />
                    <br />
                    <label htmlFor="faction">Faction:</label>
                    <select id="faction" name="faction">
                        <option value="Autobots">Autobots</option>
                        <option value="Decepticons">Decepticons</option>
                    </select>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </>
        );
    }
}
