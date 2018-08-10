import React, { Component } from 'react';
import { Card, Row, Col, Input, Icon, Form, Select, Button, InputNumber, Table } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import List from '../../components/GoodsInOutList/LIst';
import Footer from '../../components/GoodsInOutList/Footer';
import { connect } from 'dva';
const Search = Input.Search;
@connect(({ goodInOutList }) => ({
  goodInOutList,
}))
export default class GoodsInOutList extends Component {
  constructor(props) {
    super(props),
      (this.state = {
        value: '',
      });
  }

  //   添加list
  addList(e) {
    const { dispatch } = this.props;
    const value = this.state.value;
    this.setState({
      value: '',
      searchvalue: '',
    });
    if (value.trim() !== '') {
      dispatch({
        type: 'goodInOutList/addListEffect',
        param: value,
      });
    }
  }

  //   完成一个list
  completedList(id) {
    const { dispatch } = this.props;
    dispatch({
      type: 'goodInOutList/completedListEffect',
      param: id,
    });
  }

  //   删除一个list
  deleteList(id) {
    const { dispatch } = this.props;
    dispatch({
      type: 'goodInOutList/deleteListEffect',
      param: id,
    });
  }

  //   改变一个list
  changeList(param) {
    const { dispatch } = this.props;
    dispatch({
      type: 'goodInOutList/changeListEffect',
      param: param,
    });
  }

  // 绑定输入框的值
  valueChange(e, val) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value,
    });
  }

  //   显示全部0/完成1/未完成2
  changeShowList(param) {
    const { dispatch } = this.props;
    this.setState({
      searchvalue: '',
    });
    dispatch({
      type: 'goodInOutList/changeShowListEffect',
      param: param,
    });
  }
  //查找一个list
  searchList(e) {
    const param = e.target.value;
    const { dispatch } = this.props;
    dispatch({
      type: 'goodInOutList/searchListEffect',
      param: param,
    });
  }

  render() {
    return (
      <div>
        <PageHeaderLayout title="!!!">
          <Card title="ToDoList" bordered={false} style={{ width: 600, margin: '0 auto' }}>
            <Row>
              <Col span={11}>
                <Search
                  placeholder="add todos"
                  enterButton="Add"
                  size="large"
                  name="value"
                  value={this.state.value}
                  onChange={e => this.valueChange(e)}
                  onSearch={e => this.addList(e)}
                />
              </Col>
              <Col span={11} offset={2}>
                <Search
                  placeholder="search todos"
                  enterButton="Search"
                  size="large"
                  name="searchvalue"
                  value={this.state.searchvalue}
                  onChange={e => {
                    this.valueChange(e), this.searchList(e);
                  }}
                />
              </Col>
            </Row>
            <List
              completedList={this.completedList.bind(this)}
              deleteList={this.deleteList.bind(this)}
              changeList={this.changeList.bind(this)}
            />
            {this.props.goodInOutList.isSearchVal && (
              <p style={{ textAlign: 'center', color: 'red' }}>
                <Icon type="meh-o" />
                &nbsp;没有这个todo~
              </p>
            )}
            <Footer changeShowList={this.changeShowList.bind(this)} />
          </Card>
        </PageHeaderLayout>
      </div>
    );
  }
}
