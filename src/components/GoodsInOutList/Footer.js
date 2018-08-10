import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Input, Icon, Form, Select, Button, InputNumber, Table } from 'antd';
@connect(({ goodInOutList }) => ({
  goodInOutList,
}))
export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange(e, param) {
    this.props.changeShowList(param);
  }

  render() {
    //   console.log('this',this.props.goodInOutList.isShowAll)
    return (
      <div>
        <Row>
          <Col span={3} style={{ height: 30, lineHeight: '30px' }}>
            <span>SHOW:</span>
          </Col>
          <Col span={4}>
            <Button
              type={this.props.goodInOutList.isShowAll == 0 ? 'primary' : ''}
              onClick={e => this.handleChange(e, 0)}
            >
              ALL
            </Button>
          </Col>
          <Col span={4}>
            <Button
              type={this.props.goodInOutList.isShowAll == 1 ? 'primary' : ''}
              onClick={e => this.handleChange(e, 1)}
            >
              Active
            </Button>
          </Col>
          <Col span={4}>
            <Button
              type={this.props.goodInOutList.isShowAll == 2 ? 'primary' : ''}
              onClick={e => this.handleChange(e, 2)}
            >
              Comleted
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
