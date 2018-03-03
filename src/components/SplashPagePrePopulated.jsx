import React, { Component } from 'react';
import { connect } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import extend from 'lodash/extend';
import PropTypes from 'prop-types';

import LinkButton from './commonComponents/LinkButton';
import Button from './commonComponents/Button';
import InputField from './formComponents/InputField';
import { fetchStudentData, setStudentCredentials } from '../actions/studentRegistrationActions';
import yjsgLogo from '../assets/yjsgLogo.png';
import {
  yjsgHeader,
  eventDate,
  eventVenue,
} from '../utils/yjsgConstants';
import { setRegistrationData } from '../utils/registrationFormUtils';
import { getUserId, getUserSecretKey } from '../reducers/studentRegistrationReducer';

class SplashPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCorrection: true,
      credentials: {},
      isURLParams: false
    };

    this._enableEditInfo = this.enableEditInfo.bind(this);
    this._disableEditInfo = this.disableEditInfo.bind(this);
    this._handleInputChange = this.handleInputChange.bind(this);
    this._fetchStudentById = this.fetchStudentById.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      credentials: {
        studentId: nextProps.id,
        secretKey: nextProps.secretKey,
      }
    });
  }

  componentDidMount() {
    this.setState({
      credentials: {
        studentId: this.props.id,
        secretKey: this.props.secretKey,
      }
    });
  }

  enableEditInfo() {
    this.setState({
      isCorrection: true,
    })
  }

  disableEditInfo() {
    this.setState({
      isCorrection: false,
    })
  }

  fetchStudentById () {
    this.props.setStudentCredentials(this.state.credentials.studentId,
      this.state.credentials.secretKey);
    this.props.fetchStudentData(this.state.credentials.studentId,
      this.state.credentials.secretKey);
  };

  handleInputChange(value, name) {
    let updatedData = extend(cloneDeep(this.state.credentials),
      setRegistrationData(value, name));
    this.setState({
      credentials: updatedData,
    });
  }

  renderCorrectionIdField() {
    if (this.state.isCorrection) {
      return (
        <div>
          <InputField
            type={'number'}
            name={'studentId'}
            label={'आई.डी. नं.'}
            placeholder={'अपना आई.डी. नं. दर्ज करें'}
            onInputChange={this._handleInputChange}
            value={this.state.credentials.studentId}
          />
          <InputField
            type={'text'}
            name={'secretKey'}
            label={'सीक्रेट कोड'}
            placeholder={'अपना सीक्रेट कोड दर्ज करें'}
            onInputChange={this._handleInputChange}
            value={this.state.credentials.secretKey}
          />
          <LinkButton
            buttonText={'View/Edit Information'}
            linkPath={'/studentCorrection'}
            onClick={this._fetchStudentById}
          />
          <Button
            buttonText={'Go Back'}
            onClick={this._disableEditInfo}
          />
        </div>
      )
    } else {
      return (
        <div>
          <Button
            buttonText={'Already Registered'}
            onClick={this._enableEditInfo}
          />
          <LinkButton
            buttonText={'New Registration'}
            linkPath={'/studentRegister'}
          />
        </div>
      )
    }
  }

  render() {
    return (
      <div className={'landingPageContainer'}>
        <h2>{yjsgHeader}</h2>
        <div className={'yjsgEventInfo'}>
          <h5>{eventDate}</h5>
          <h5>{eventVenue}</h5>
        </div>
        <div className={'landingPageContent'}>
          <div className={'landingPageLogo'}>
            <img src={yjsgLogo} alt={'yjsg logo'} />
          </div>
          <div className={'landingPageButtonContainer'}>
            {this.renderCorrectionIdField()}
          </div>
        </div>
      </div>)
  }
}

SplashPage.propTypes = {
  fetchStudentData: PropTypes.func,
  setStudentCredentials: PropTypes.func,
};

SplashPage.defaultProps = {
  fetchStudentData: () => {},
  setStudentCredentials: () => {},
};

const mapStateToProps = state => ({
  id: getUserId(state),
  secretKey: getUserSecretKey(state),
});

export default connect(mapStateToProps, {
  fetchStudentData,
  setStudentCredentials
})(SplashPage);
