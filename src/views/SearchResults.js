import React, { Component } from 'react';
import BoardsCard from '../components/Cards/BoardsCard';
import PinsCard from '../components/Cards/PinsCard';
import boardData from '../helpers/data/boardData';
import { getAllUserPins } from '../helpers/data/pinData';
import getUid from '../helpers/data/authData';

export default class SearchResults extends Component {
  state = {
    results: [],
    searchTerm: '',
    searchType: '',
  };

  componentDidMount() {
    this.performSearch();
  }

  performSearch = () => {
    const searchTerm = this.props.match.params.term;
    const searchType = this.props.match.params.type;
    const uid = getUid();

    if (searchType === 'boards') {
      // Make an API that get the boards with the search term filter
      boardData.getAllUserBoards(uid).then((response) => {
        const results = response.filter(
          (result) => result.name.includes(searchTerm),
        );
        this.setState({
          results,
          searchTerm,
          searchType,
        });
      });
    } else {
      // Make an API that get the pins with the search term filter
      getAllUserPins(uid).then((response) => {
        const results = response.filter(
          (result) => result.name.includes(searchTerm),
        );
        this.setState({
          results,
          searchTerm,
          searchType,
        });
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.props.match.params.term) {
      this.performSearch();
    }
  }

  render() {
    const { results, searchType } = this.state;

    const showResults = () => ((results.length) ? (
      results.map((result) => (searchType === 'boards' ? (
          <BoardsCard key={result.firebaseKey} board={result} isOnHome={true}/>
      ) : (
          <PinsCard key={result.firebaseKey} pin={result} isOnHome={true}/>
      )))
    ) : (
      <h3>No results found</h3>
    ));
    return (
      <div className='d-flex flex-column align-items-center'>
        <h1>Search Results</h1>
        <div className='align-items-center'>{showResults()}</div>
    </div>
    );
  }
}
