import React from 'react';
import { Table } from 'antd';

export default class TableComponent extends React.Component {
  state = {
    sortedInfo: null,
    pageSize:5
  };

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      sortedInfo: sorter,
    });
  };


  render() {
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
    const columns = [
      {
        title: 'TimeStamp',
        dataIndex: 'timestamp',
        key: 'timestamp',
        sorter: (a, b) =>  {
            return a.timestamp.split('-').join("").split("-").join("") - b.timestamp.split('-').join("").split("-").join("")},
        sortOrder: sortedInfo.columnKey === 'timestamp' && sortedInfo.order,
      },
      {
        title: 'Game',
        dataIndex: 'game',
        key: 'game',
        sorter: (a, b) => a.game.length - b.game.length,
        sortOrder: sortedInfo.columnKey === 'game' && sortedInfo.order,
      },
      {
        title: 'Revenue',
        dataIndex: 'revenue',
        key: 'revenue',
        sorter: (a, b) => a.revenue - b.revenue,
        sortOrder: sortedInfo.columnKey === 'revenue' && sortedInfo.order,
      },
      {
        title: 'Impressions',
        dataIndex: 'impressions',
        key: 'impressions',
        sorter: (a, b) => a.impressions - b.impressions,
        sortOrder: sortedInfo.columnKey === 'impressions' && sortedInfo.order,
      },
      {
        title: 'ECPM',
        dataIndex: 'ecpm',
        key: 'ecpm',
        sorter: (a, b) => a.emc - b.emc,
        sortOrder: sortedInfo.columnKey === 'ecpm' && sortedInfo.order,
      },

    ];
    return (
      <div>
        <Table columns={columns} dataSource={this.props.graphData} onChange={this.handleChange} pagination={{ pageSize: 5 }}/>
      </div>
    );
  }
}