import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import extend  from 'lodash/extend';

import {
  studiesArray,
  busStops,
  gender,
  goBackBtnText,
  formSubmitBtnText,
} from '../utils/yjsgConstants';
import InputField from './formComponents/InputField';
import TextAreaField from './formComponents/TextAreaField';
import LinkButton from './commonComponents/LinkButton';
import {
createStudentData,
setStudentCredentials,
} from '../actions/studentRegistrationActions';
import {
isDataCorrect,
isValidUserInfo,
setRegistrationData,
validateInput,
} from '../utils/registrationFormUtils';
import { yjsgHeader } from '../utils/yjsgConstants';
import SelectListInputField from './formComponents/SelectListInputField';
import Button from './commonComponents/Button';
import {
getNewStudent,
isCreated,
isLoading,
} from '../reducers/studentRegistrationReducer';

class StudentRegistrationForm extends Component {
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
        optIn2018: 1,
      },
      isSubmitTriggered: false,
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
      }
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

  componentDidMount() {
    this.checkError({email: '', motherMobile: '', optIn2018: 1});
  }

  isValidData() {
    return isValidUserInfo(this.state.errorMessage);
  }

  submitStudentData() {
    this.checkError(this.state.student);
    if(this.isValidData()) {
      this.props.createStudentData(this.state.student);
      this.setState({
        isSubmitTriggered: true,
      });
    }
  }

  handleInputChange(value, name) {
    let errorMessageObject = {} ;
    errorMessageObject[name]= validateInput(value, name);

    let updatedErrorState = extend(cloneDeep(this.state.errorMessage), errorMessageObject);

    let updatedData = extend(cloneDeep(this.state.student),
      setRegistrationData(value, name));
    this.setState({
      student: updatedData,
      isSubmitTriggered: false,
      errorMessage: updatedErrorState,
    });
  }

  renderSuccessMessage() {
    if(this.props.isCreated && this.state.isSubmitTriggered){
      const student = this.props.newStudent;

      this.props.setStudentCredentials(student.id, student.secretKey);
      return (
        <div className={"popup"}>
          <div className={"popupContainer"}>
            <p>{`आपका रजिस्ट्रेशन "जैन बाल एवं युवा शिविर के लिए हो चूका है |`}</p>
            <p>{`आपका ID: `}<strong>{student['id']}</strong>{` है |`}</p>
             <p>{`आपका सीक्रेट कोड: `}<strong>{student['secretKey']}</strong>{` है |`}</p>
             <p>{`कृपया अपना ID और सीक्रेट कोड ध्यानपूर्वक नोट कर लेवे |`}</p>
             <p>{`शीघ्र ही आपका ID Card आपके क्षेत्रीय संयोजक द्वारा भेजा जायेगा |`}</p>
            <LinkButton
              buttonText={goBackBtnText}
              linkPath={'/splashPrePopulated'}
            />
          </div>
        </div>
      );
    }
    else return null;
  }

  render() {
    if (this.props.isLoading) {
      return (
        <div className={"popup"}>
          <div className={"popupContainer"}>
            <h5>{'Loading...'}</h5>
          </div>
        </div>
      );
    }
    return (
      <div className={'registrationFormContainer'}>
        {this.renderSuccessMessage()}
        <h3 className={'registrationFormHeading'}>{yjsgHeader}</h3>
        <div className={'inputFieldContainer'}>
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
          <SelectListInputField
            name={'course2018'}
            label={'आप क्या अध्ययन करना चाहते हैं ?'}
            options={studiesArray}
            onInputChange={this._handleInputChange}
            value={this.state.student.course2018}
            isRequired={true}
            errorMessage={this.state.errorMessage.course2018['message']}
          />
          <InputField
            type={'text'}
            label={'पूर्व में किये गए धार्मिक अध्ययन का विवरण'}
            name={'classAttended2017'}
            onInputChange={this._handleInputChange}
            value={this.state.student.classAttended2017}
            isRequired={false}
          />
          <div className={'registrationFormButtonContainer'}>
            <Button
              buttonText={formSubmitBtnText}
              onClick={this._submitStudentData}
            />
            <LinkButton
              buttonText={goBackBtnText}
              linkPath={'/'}
            />
          </div>
        </div>
      </div>
    );
  }
}

StudentRegistrationForm.propTypes = {
  isLoading: PropTypes.bool,
  isCreated: PropTypes.bool,
  newStudent: PropTypes.object,
  createStudentData: PropTypes.func,
  setStudentCredentials: PropTypes.func,
};

StudentRegistrationForm.defaultProps = {
  isLoading: false,
  isCreated: false,
  newStudent: {},
  createStudentData: () => {},
  setStudentCredentials: () => {},
};

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  isCreated: isCreated(state),
  newStudent: getNewStudent(state),
});

export default connect(mapStateToProps, {
  createStudentData,
  setStudentCredentials,
})(StudentRegistrationForm);

