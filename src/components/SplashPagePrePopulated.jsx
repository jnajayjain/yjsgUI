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
            min={0}
          />
          <InputField
            type={'text'}
            name={'secretKey'}
            label={'सीक्रेट कोड'}
            placeholder={'अपना सीक्रेट कोड दर्ज करें'}
            onInputChange={this._handleInputChange}
            value={this.state.credentials.secretKey}
            min={0}
          />
          <LinkButton
            buttonText={'रजिस्ट्रेशन सुधारें'}
            linkPath={'/studentCorrection'}
            onClick={this._fetchStudentById}
          />
          <Button
            buttonText={'वापस जाओ'}
            onClick={this._disableEditInfo}
          />
        </div>
      )
    } else {
      return (
        <div>
          <Button
            buttonText={'रजिस्ट्रेशन सुधार'}
            onClick={this._enableEditInfo}
          />
          <LinkButton
            buttonText={'नया रजिस्ट्रेशन'}
            linkPath={'/studentRegister'}
          />
        </div>
      )
    }
  }

  render() {
    return (
      <div className={'landingPageContainer'}>
        <h2>{'जैन बाल एवं युवा संस्कार शिक्षण शिविर (तृतीय) पोर्टल'}</h2>
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
