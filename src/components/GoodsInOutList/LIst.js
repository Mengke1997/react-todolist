import React, { Component } from 'react';
import { Checkbox, Icon, Input } from 'antd';
import { connect } from 'dva';
import _ from 'lodash';
@connect(({ goodInOutList }) => ({
  goodInOutList,
}))
export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editIndex: '',
      inputVal: '',
    };
  }

  //   点击完成
  handle(e, id) {
    e.preventDefault();
    this.props.completedList(id);
  }

  //   删除
  handleDeletd(e, id) {
    e.preventDefault();
    this.props.deleteList(id);
  }

  //   编辑
  handleChange(e, param) {
    console.log(param);
    e.preventDefault();
    this.setState({
      editIndex: param.id,
      inputVal: '',
    });
    if (param.value !== '') {
      this.props.changeList(param);
      this.setState({
        inputVal: '',
        editIndex: '',
      });
    }
  }

  //   绑定输入框的值
  valueChange(e) {
    const value = e.target.value;
    this.setState({
      inputVal: value,
    });
  }

  render() {
    const { goodInOutList } = this.props;
    const { showListData } = goodInOutList;
    const liThroughStyle = {
      textDecoration: ' line-through',
    };
    const liStyle = {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      maxWidth: '80%',
    };
    const inputStyle = {
      position: 'absolute',
      left: '23px',
      top: '5px',
      width: '89%',
    };
    const listItem = showListData.map((item, key) => (
      <li
        key={key}
        style={{ listStyle: 'none', marginBottom: 10, fontSize: 20, position: 'relative' }}
      >
        <Checkbox checked={item.completed} onClick={e => this.handle(e, item.id)} style={liStyle}>
          <span style={item.completed ? liThroughStyle : {}}>{item.text}</span>
        </Checkbox>
        <Icon
          type="edit"
          style={{ paddingTop: 9, cursor: 'pointer', marginLeft: 20 }}
          onClick={e => this.handleChange(e, { id: item.id, value: '' })}
        />
        <Icon
          type="delete"
          style={{ float: 'right', paddingTop: 9, fontSize: 18, cursor: 'pointer' }}
          onClick={e => this.handleDeletd(e, item.id)}
        />
        {this.state.editIndex === item.id && (
          <Input
            style={inputStyle}
            value={this.state.inputVal}
            onChange={e => this.valueChange(e)}
            onBlur={e => this.handleChange(e, { id: '', value: '' })}
            onPressEnter={e => this.handleChange(e, { id: item.id, value: this.state.inputVal })}
          />
        )}
      </li>
    ));
    return <ul style={{ marginTop: 20, paddingLeft: 5 }}>{listItem}</ul>;
  }
}
