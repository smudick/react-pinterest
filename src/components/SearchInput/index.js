import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class SearchInput extends Component {
  state = {
    type: 'pins',
    text: '',
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push(`/search/${this.state.text}/${this.state.type}`);

    this.setState({
      type: 'pins',
      text: '',
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
    <form onSubmit={this.handleSubmit}>
      <div className='d-flex'>
      <input type='text' className="form-control mr-1" placeholder="Search" name='text' value={this.state.text} onChange={this.handleChange} />
      <select name='type' className='form-control form-control-md' value={this.state.type} onChange={this.handleChange} >
        <option value='pins'>Pins</option>
        <option value='boards'>Boards</option>
      </select>
      </div>
    </form>
    );
  }
}

export default withRouter(SearchInput);
