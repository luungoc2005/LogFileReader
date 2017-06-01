import React from 'react';

import { Table } from 'semantic-ui-react';
import momentPropTypes from 'react-moment-proptypes';

export default class FileRow extends React.PureComponent {
    static propTypes = {
        index: React.PropTypes.number.isRequired,
        fileName: React.PropTypes.string.isRequired,
        createdDate: momentPropTypes.momentObj.isRequired
    };
    render () {
        const { fileName, createdDate } = this.props;

        return (
            <Table.Row>
                <Table.Cell>{fileName}</Table.Cell>
                <Table.Cell>{createdDate}</Table.Cell>
                <Table.Cell>Actions</Table.Cell>
            </Table.Row>
        );
    }
}