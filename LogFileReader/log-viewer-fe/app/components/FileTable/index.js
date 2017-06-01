import React from 'react';

import { Table } from 'semantic-ui-react';

export default class FileTable extends React.PureComponent {
    static propTypes = {
        content: React.PropTypes.arrayOf(React.PropTypes.element)
    };
    render() {
        const headers = ['File Name', 'Created Date', 'Actions'].map((item, index) => (
            <Table.HeaderCell key={index}>{item}</Table.HeaderCell>
        ));

        return (
            <Table>
                <Table.Header>{headers}</Table.Header>
                <Table.Body>{this.props.content}</Table.Body>
            </Table>
        )
    }
}