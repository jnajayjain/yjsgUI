import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import extend  from 'lodash/extend';
import isEqual from 'lodash/isEqual';

import {
  studiesArray,
  busStops,
  gender,
  optIn2018Options,
  goBackBtnText,
  formSubmitBtnText,
  invalidIdMessage,
  noInfoChangeMessage,
  infoUpdateSuccessMessage,
} from '../utils/yjsgConstants';
import InputField from './formComponents/InputField';
import TextAreaField from './formComponents/TextAreaField';
import LinkButton from './commonComponents/LinkButton';
import { yjsgHeader } from '../utils/yjsgConstants';
import { updateStudentData } from '../actions/studentRegistrationActions';
import {
checkLevelValue,
isDataCorrect,
isValidUserInfo,
setRegistrationData,
validateInput,
} from '../utils/registrationFormUtils';
import {
getStudent,
isFetched,
isLoading,
isUpdated,
} from '../reducers/studentRegistrationReducer';
import SelectListInputField from './formComponents/SelectListInputField';
import Button from './commonComponents/Button';
import { getUserId, getUserSecretKey } from '../reducers/studentRegistrationReducer';

class StudentRegistrationCorrectionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      student: {
        name: '',
        fatherName: '',
        gender: '',
        age: '',
        mobile: '',
        motherMobile: '',
        email: '',
        address: '',
        busStop: '',
        course2018: '',
        optIn2018: ''
      },
      isSubmitTriggered: false,
      isValidId: false,
      isFormChanged: false,
      errorMessage: {
        name: {},
        fatherName: {},
        gender: {},
        age: {},
        mobile: {},
        motherMobile: {},
        email: {},
        address: {},
        busStop: {},
        course2018: {},
        optIn2018: {},
      },
    };

    this._submitStudentData = this.submitStudentData.bind(this);
    this._handleInputChange = this.handleInputChange.bind(this);
  }

  checkError(studentData) {
    let errorMessageObject = extend(cloneDeep(this.state.errorMessage),
      isDataCorrect(studentData));
    this.setState({
      errorMessage: errorMessageObject,
    });
  }

  prePopulateCourse2018(nextProps) {
    const lastCourse = nextProps.studentData.classAttended2017;
    const level = checkLevelValue(lastCourse);
    if (level > 0) {
      const updatedData = extend(cloneDeep(this.state.student), {course2018: level + 1});
      this.setState({
        student: updatedData,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.studentData) {
      this.prePopulateCourse2018(nextProps);
      this.setState({
        student: nextProps.studentData,
        isValidId: true,
        isSubmitTriggered: false,
      });
      this.checkError({email: '', motherMobile: ''});
    }
  }

  isValidData() {
    return isValidUserInfo(this.state.errorMessage);
  }

  updateStudentData() {
    this.props.updateStudentData(this.props.id,
      this.props.secretKey,
      this.state.student);
  }

  submitStudentData() {
    if (String(this.state.student.optIn2018) !== '1') {
      this.setState({
        isSubmitTriggered: true,
      });
      this.updateStudentData();
    } else {
      this.checkError(this.state.student);

      if(!isEqual(this.props.studentData, this.state.student) && this.isValidData()) {
        this.setState({
          isSubmitTriggered: true,
        });
        this.updateStudentData();
      } else {
        this.setState({
          isFormChanged: false,
          isSubmitTriggered: true,
        });
      }
    }
  }

  handleInputChange(value, name) {
    let updatedData = extend(cloneDeep(this.state.student),
      setRegistrationData(value, name));
    let errorMessageObject = {} ;

    errorMessageObject[name]= validateInput(value, name);

    let updatedErrorState = extend(cloneDeep(this.state.errorMessage), errorMessageObject);

    this.setState({
      student: updatedData,
      errorMessage: updatedErrorState,
      isFormChanged: true,
      isSubmitTriggered: false,
    });
    this.checkError(updatedData);
  }

  renderSuccessMessage() {
    if(this.props.isUpdated){
      return (
        <div className={"popup"}>
          <div className={"popupContainer"}>
            <h5>{infoUpdateSuccessMessage}</h5>
            <LinkButton
              buttonText={goBackBtnText}
              linkPath={'/splashPrePopulated'}
            />
          </div>
        </div>
      );
    }
    else if (this.state.isSubmitTriggered && !this.state.isFormChanged && this.isValidData()) {
      return (
        <div className={"popup"}>
          <div className={"popupContainer"}>
            <h5>{noInfoChangeMessage}</h5>
            <LinkButton
              buttonText={goBackBtnText}
              linkPath={'/splashPrePopulated'}
            />
          </div>
        </div>
      );
    } else return null;
  }

  renderClassAttended2017() {
    if(this.props.studentData.classAttended2017) {
      return (
        <InputField
          type={'text'}
          label={'पूर्व में किये गए धार्मिक अध्ययन का विवरण'}
          name={'classAttended2017'}
          onInputChange={this._handleInputChange}
          value={this.state.student.classAttended2017}
          isRequired={false}
          disabled={true}
        />
      )
    } else {
      return (
        <InputField
          type={'text'}
          label={'पूर्व में किये गए धार्मिक अध्ययन का विवरण'}
          name={'classAttended2017'}
          onInputChange={this._handleInputChange}
          value={this.state.student.classAttended2017}
          isRequired={false}
        />
      )
    }
  }

  renderNoValidationFields() {
    return (
      <div className={'registrationFormContainer'}>
        {this.renderSuccessMessage()}
        <h3 className={'registrationFormHeading'}>{yjsgHeader}</h3>
        <div className={'inputFieldContainer'}>
          <SelectListInputField
            name={'optIn2018'}
            label={'2018 के शिविर की स्वीकृति ?'}
            options={optIn2018Options}
            onInputChange={this._handleInputChange}
            value={this.state.student.optIn2018}
            isRequired={true}
          />
          <InputField
            type={'number'}
            label={'आई.डी.'}
            name={'id'}
            onInputChange={this._handleInputChange}
            value={this.state.student.id}
            isRequired={true}
            disabled={true}
          />
          <InputField
            type={'text'}
            label={'नाम'}
            name={'name'}
            onInputChange={this._handleInputChange}
            value={this.state.student.name}
            isRequired={true}
          />
          <InputField
            type={'text'}
            label={'पिता / पति का नाम'}
            name={'fatherName'}
            onInputChange={this._handleInputChange}
            value={this.state.student.fatherName}
            isRequired={true}
          />
          <SelectListInputField
            name={'gender'}
            label={'लिंग'}
            options={gender}
            onInputChange={this._handleInputChange}
            value={this.state.student.gender}
            isRequired={true}
          />
          <InputField
            type={'number'}
            label={'उम्र'}
            name={'age'}
            onInputChange={this._handleInputChange}
            value={this.state.student.age}
            isRequired={true}
          />
          <InputField
            type={'number'}
            label={'मोबाइल नं.'}
            name={'mobile'}
            onInputChange={this._handleInputChange}
            value={this.state.student.mobile}
            isRequired={true}
          />
          <InputField
            type={'number'}
            label={'मोबाइल नं. ( माता का )'}
            name={'motherMobile'}
            onInputChange={this._handleInputChange}
            value={this.state.student.motherMobile}
            isRequired={false}
          />
          <InputField
            type={'text'}
            label={'व्यवसाय (युवा वर्ग हेतु)'}
            name={'occupation'}
            onInputChange={this._handleInputChange}
            value={this.state.student.occupation}
            isRequired={false}
          />
          <InputField
            type={'text'}
            label={'स्कूल शिक्षा'}
            name={'education'}
            onInputChange={this._handleInputChange}
            value={this.state.student.education}
            isRequired={false}
          />
          <InputField
            type={'email'}
            label={'ई-मेल'}
            name={'email'}
            onInputChange={this._handleInputChange}
            value={this.state.student.email}
            isRequired={false}
          />
          <TextAreaField
            label={'पूरा पता'}
            name={'address'}
            onInputChange={this._handleInputChange}
            value={this.state.student.address}
            isRequired={true}
          />
          <SelectListInputField
            type={'text'}
            label={'बस स्टॉप (कृपया निकटतम बस स्टॉप चुनें)'}
            name={'busStop'}
            options={busStops}
            onInputChange={this._handleInputChange}
            value={this.state.student.busStop}
            isRequired={true}
          />
          {this.renderClassAttended2017()}
          <SelectListInputField
            name={'course2018'}
            label={'आप क्या अध्ययन करना चाहते हैं ?'}
            options={studiesArray}
            onInputChange={this._handleInputChange}
            value={this.state.student.course2018}
            isRequired={true}
          />
          <div className={'registrationFormButtonContainer'}>
            <Button
              buttonText={formSubmitBtnText}
              onClick={this._submitStudentData}
            />
            <LinkButton
              buttonText={goBackBtnText}
              linkPath={'/splashPrePopulated'}
            />
          </div>
        </div>
      </div>
    )
  }


  render() {
    if (String(this.state.student.optIn2018) !== '1') {
      return this.renderNoValidationFields();
    }
    if (this.props.studentData && this.props.isFetched) {
      return (
        <div className={'registrationFormContainer'}>
          {this.renderSuccessMessage()}
          <h3 className={'registrationFormHeading'}>{yjsgHeader}</h3>
          <div className={'inputFieldContainer'}>
            <SelectListInputField
              name={'optIn2018'}
              label={'2018 के शिविर की स्वीकृति ?'}
              options={optIn2018Options}
              onInputChange={this._handleInputChange}
              value={this.state.student.optIn2018}
              isRequired={true}
              errorMessage={this.state.errorMessage.optIn2018['message']}
            />
            <InputField
              type={'number'}
              label={'आई.डी.'}
              name={'id'}
              onInputChange={this._handleInputChange}
              value={this.state.student.id}
              isRequired={true}
              disabled={true}
            />
            <InputField
              type={'text'}
              label={'नाम'}
              name={'name'}
              onInputChange={this._handleInputChange}
              value={this.state.student.name}
              isRequired={true}
              errorMessage={this.state.errorMessage.name['message']}
            />
            <InputField
              type={'text'}
              label={'पिता / पति का नाम'}
              name={'fatherName'}
              onInputChange={this._handleInputChange}
              value={this.state.student.fatherName}
              isRequired={true}
              errorMessage={this.state.errorMessage.fatherName['message']}
            />
            <SelectListInputField
              name={'gender'}
              label={'लिंग'}
              options={gender}
              onInputChange={this._handleInputChange}
              value={this.state.student.gender}
              isRequired={true}
              errorMessage={this.state.errorMessage.gender['message']}
            />
            <InputField
              type={'number'}
              label={'उम्र'}
              name={'age'}
              onInputChange={this._handleInputChange}
              value={this.state.student.age}
              isRequired={true}
              errorMessage={this.state.errorMessage.age['message']}
            />
            <InputField
              type={'number'}
              label={'मोबाइल नं.'}
              name={'mobile'}
              onInputChange={this._handleInputChange}
              value={this.state.student.mobile}
              isRequired={true}
              errorMessage={this.state.errorMessage.mobile['message']}
            />
            <InputField
              type={'number'}
              label={'मोबाइल नं. ( माता का )'}
              name={'motherMobile'}
              onInputChange={this._handleInputChange}
              value={this.state.student.motherMobile}
              isRequired={false}
              errorMessage={this.state.errorMessage.motherMobile['message']}
            />
            <InputField
              type={'text'}
              label={'व्यवसाय (युवा वर्ग हेतु)'}
              name={'occupation'}
              onInputChange={this._handleInputChange}
              value={this.state.student.occupation}
              isRequired={false}
            />
            <InputField
              type={'text'}
              label={'स्कूल शिक्षा'}
              name={'education'}
              onInputChange={this._handleInputChange}
              value={this.state.student.education}
              isRequired={false}
            />
            <InputField
              type={'email'}
              label={'ई-मेल'}
              name={'email'}
              onInputChange={this._handleInputChange}
              value={this.state.student.email}
              isRequired={false}
              errorMessage={this.state.errorMessage.email['message']}
            />
            <TextAreaField
              label={'पूरा पता'}
              name={'address'}
              onInputChange={this._handleInputChange}
              value={this.state.student.address}
              isRequired={true}
              errorMessage={this.state.errorMessage.address['message']}
            />
            <SelectListInputField
              type={'text'}
              label={'बस स्टॉप (कृपया निकटतम बस स्टॉप चुनें)'}
              name={'busStop'}
              options={busStops}
              onInputChange={this._handleInputChange}
              value={this.state.student.busStop}
              isRequired={true}
              errorMessage={this.state.errorMessage.busStop['message']}
            />
            {this.renderClassAttended2017()}
            <SelectListInputField
              name={'course2018'}
              label={'आप क्या अध्ययन करना चाहते हैं ?'}
              options={studiesArray}
              onInputChange={this._handleInputChange}
              value={this.state.student.course2018}
              isRequired={true}
              errorMessage={this.state.errorMessage.course2018['message']}
            />
            <div className={'registrationFormButtonContainer'}>
              <Button
                buttonText={formSubmitBtnText}
                onClick={this._submitStudentData}
              />
              <LinkButton
                buttonText={goBackBtnText}
                linkPath={'/splashPrePopulated'}
              />
            </div>
          </div>
        </div>
      );
    } else if(this.props.isLoading) {
      return (
        <div className={"popup"}>
          <div className={"popupContainer"}>
            <h5>{'Loading...'}</h5>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className={'errorPopupContainer'}>
          <div className={"popup"}>
            <div className={"popupContainer"}>
              <h5>{invalidIdMessage}</h5>
              <LinkButton
                buttonText={goBackBtnText}
                linkPath={'/splashPrePopulated'}
              />
            </div>
          </div>
        </div>
      );
    }
  }

}

StudentRegistrationCorrectionForm.propTypes = {
  studentData: PropTypes.object,
  isUpdated: PropTypes.bool,
  isLoading: PropTypes.bool,
  isFetched: PropTypes.bool,
  updateStudentData: PropTypes.func,
};

StudentRegistrationCorrectionForm.defaultProps = {
  studentData: {},
  isUpdated: false,
  isLoading: false,
  isFetched: false,
  updateStudentData: () => {},
};

const mapStateToProps = state => ({
  studentData: getStudent(state),
  isUpdated: isUpdated(state),
  isLoading: isLoading(state),
  isFetched: isFetched(state),
  id: getUserId(state),
  secretKey: getUserSecretKey(state),
});

export default connect(mapStateToProps, {
  updateStudentData,
})(StudentRegistrationCorrectionForm);
