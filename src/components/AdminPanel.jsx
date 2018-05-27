import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import extend from 'lodash/extend';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';

import {
  adminId,
  adminPassword,
  goBackBtnText,
  invalidAdminMsg,
  adminSearchOptions,
  yjsgHeader, adminLoginBtnText,
} from '../utils/yjsgConstants';
import {
  getAdminId,
  getAdminPassword,
  getSearchResults,
  isLoading,
} from '../reducers/studentRegistrationReducer';
import SelectListInputField from './formComponents/SelectListInputField';
import Table from './commonComponents/Table';
import Button from './commonComponents/Button';
import InputField from './formComponents/InputField';
import { setRegistrationData } from '../utils/registrationFormUtils';
import {
  clearSearchResultsAction,
  fetchSearchResultsAction,
  setAdminCredentials,
} from '../actions/studentRegistrationActions';
import LinkButton from './commonComponents/LinkButton';

class AdminPanel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      search: {},
    };
    this.props.clearSearchResultsAction();
    this._handleInputChange = this.handleInputChange.bind(this);
    this.populateResults = this.populateResults.bind(this);
    this.performLogout = this.performLogout.bind(this);
  }

  handleInputChange(value, name) {
    let updatedData = extend(cloneDeep(this.state.search),
      setRegistrationData(value, name));

    this.setState({
      search: updatedData,
    })
  }

  performLogout() {
    this.props.setAdminCredentials('', '');
  }

  populateResults() {
    this.props.clearSearchResultsAction();
    const { selectSearchOption, searchText } = this.state.search;
    if (!isEmpty(selectSearchOption) && !isEmpty(searchText)) {
      this.props.fetchSearchResultsAction(adminPassword, selectSearchOption, searchText)
    }
  }

  renderResultsTable() {
    const { searchResults } = this.props;
    if (!isEmpty(searchResults.students)) {
      return <Table data={searchResults.students} headings={['ID', 'Name', 'Father Name', 'Mobile']} />
    } if (!isEmpty(searchResults.message)) {
      return <h5>{'No search records found'}</h5>;
    }
    return <h5>{'Your Search Results will appear here.'}</h5>;
  }

  render() {
    const {
      id,
      password,
    } = this.props;

    if (id !== adminId || password !== adminPassword) {
      return (
        <div className={'errorPopupContainer'}>
          <div className={"popup"}>
            <div className={"popupContainer"}>
              <h5>{invalidAdminMsg}</h5>
              <LinkButton
                buttonText={goBackBtnText}
                linkPath={'/'}
              />
            </div>
          </div>
        </div>
      );
    }

    if(this.props.isLoading) {
      return (
        <div className={"popup"}>
          <div className={"popupContainer"}>
            <h5>{'Loading...'}</h5>
          </div>
        </div>
      );
    }

    return (
      <div className={'adminPanelContainer'}>
        <div className={'adminPanelHeader'}>
          <div className={'adminPanelHeading'}><h3>{yjsgHeader}</h3></div>
          <div className={'logoutButtonContainer'}>
            <LinkButton
              linkPath={'/'}
              buttonText={'Logout'}
              onClick={this.performLogout}
            />
          </div>
        </div>
        <div className={'adminPanelContent'}>
          <div className={'adminSearchContainer'}>
            <div className={'adminSearchContent'}>
              <SelectListInputField
                name={'selectSearchOption'}
                label={'Select Search Option'}
                options={adminSearchOptions}
                onInputChange={this._handleInputChange}
                value={this.state.search.selectSearchOption}
              />
              <InputField
                type={'text'}
                label={'Enter Search Text'}
                name={'searchText'}
                onInputChange={this._handleInputChange}
                value={this.state.search.searchText}
              />
              <Button
                buttonText={'Search'}
                onClick={this.populateResults}
              />
            </div>
          </div>
          <div className={'adminResultsContainer'}>
            <div className={'adminResultsContent'}>
              {this.renderResultsTable()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AdminPanel.propTypes = {
  fetchSearchResultsAction: PropTypes.func.isRequired,
  setAdminCredentials: PropTypes.func.isRequired,
  clearSearchResultsAction: PropTypes.func.isRequired,
  searchResults: PropTypes.object,
};

AdminPanel.defaultProps = {
  searchResults: {},
};

const mapStateToProps = state => ({
  id: getAdminId(state),
  password: getAdminPassword(state),
  isLoading: isLoading(state),
  searchResults: getSearchResults(state),
});

export default connect(mapStateToProps, {
  fetchSearchResultsAction,
  setAdminCredentials,
  clearSearchResultsAction,
})(AdminPanel);