import React, { Component } from 'react';
import { Card, Row, Col, Input, Icon, Form, Select, Button, InputNumber, Table } from 'antd';
import styles from './stockManage.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import FormItem from 'antd/lib/form/FormItem';
import { connect } from 'dva';

@Form.create()
@connect(({ stock }) => ({
  stock,
}))
export default class GoodStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: true,
      columns: [
        { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
        { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
        { title: 'Column 1', dataIndex: 'address', key: '1', width: 150, fixed: 'left' },
        { title: 'Column 2', dataIndex: 'address', key: '2', width: 150 },
        { title: 'Column 3', dataIndex: 'address', key: '3', width: 150 },
        { title: 'Column 4', dataIndex: 'address', key: '4', width: 150 },
        { title: 'Column 5', dataIndex: 'address', key: '5', width: 150 },
        { title: 'Column 6', dataIndex: 'address', key: '6', width: 150 },
        { title: 'Column 7', dataIndex: 'address', key: '7', width: 150 },
        { title: 'Column 8', dataIndex: 'address', key: '8', width: 150 },
        { title: 'Column 9', dataIndex: 'address', key: '9', width: 150 },
        { title: 'Column 10', dataIndex: 'address', key: '10', width: 150 },
        {
          title: 'Action',
          key: 'operation',
          fixed: 'right',
          width: 100,
          render: () => <a href="javascript:;">action</a>,
        },
      ],
      data: [],
    };

    for (let i = 0; i < 100; i++) {
      this.state.data.push({
        key: i,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
      });
    }
  }

  toggle(e) {
    this.setState({
      expand: !this.state.expand,
    });
  }

  clearSearch(e) {
    e.preventDefault();
    this.props.form.resetFields();
  }

  handleSearch(e) {
    e.preventDefault();
    const { form, history, dispatch } = this.props;
    console.log(dispatch);
    form.validateFields((err, values) => {
      // console.log('Received values of form: ', values);
      // var params = {};
      // for (var i in values) {
      //   if (values[i]) {
      //     params[i] = values[i];
      //   }
      // }
      // dispatch({
      //   type: 'stock/fetch',
      //   offset: 0,
      //   limit: 10,
      //   params: params,
      // });
    });
  }

  IsExpand() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form layout="inline" onSubmit={e => this.handleSearch(e)}>
          <Row>
            <Col span={8}>
              <FormItem label="商品ID">
                {getFieldDecorator('gno')(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="商品名称">
                {getFieldDecorator('product_name')(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="型号">
                {getFieldDecorator('partnumber')(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
          </Row>
          {this.state.expand && (
            <Row style={{ marginTop: 20 }}>
              <Col span={8}>
                <FormItem label="上下架状态">
                  {getFieldDecorator('publish_status')(
                    <Select placeholder="请选择" style={{ width: '92%' }}>
                      <Select.Option value="">全部</Select.Option>
                      <Select.Option value="0">上架中</Select.Option>
                      <Select.Option value="1">下架中</Select.Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="审核状态">
                  {getFieldDecorator('audit_status')(
                    <Select placeholder="请选择">
                      <Select.Option value="">全部</Select.Option>
                      <Select.Option value="0">未审核</Select.Option>
                      <Select.Option value="1">审核通过</Select.Option>
                      <Select.Option value="2">审核不通过</Select.Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="库存数量：">
                  <Row>
                    <Col span={11}>
                      <FormItem>
                        {getFieldDecorator('stock_start')(
                          <InputNumber placeholder="最小值" style={{ width: '100%' }} />
                        )}
                      </FormItem>
                    </Col>
                    <Col span={2}>~</Col>
                    <Col span={11}>
                      <FormItem>
                        {getFieldDecorator('stock_end')(
                          <InputNumber placeholder="最大值" style={{ width: '100%' }} />
                        )}
                      </FormItem>
                    </Col>
                  </Row>
                </FormItem>
              </Col>
            </Row>
          )}
          <Row style={{ marginTop: 20 }}>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={e => this.clearSearch(e)}>
                重置
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.listWrap}>
        <PageHeaderLayout title="商品库存列表">
          <a onClick={e => this.toggle(e)} className={styles.listToggle}>
            {this.state.expand ? '收起' : '展开'}
            <Icon type={this.state.expand ? 'up' : 'down'} />
          </a>
          <Card title="搜索条件" bordered={false}>
            {this.IsExpand()}
          </Card>
          <Card style={{ marginTop: 30 }}>
            <Table
              columns={this.state.columns}
              dataSource={this.state.data}
              scroll={{ x: '130%' }}
            />
          </Card>
        </PageHeaderLayout>
      </div>
    );
  }
}
