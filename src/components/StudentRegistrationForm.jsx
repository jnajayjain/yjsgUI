import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import extend  from 'lodash/extend';

import InputField from './formComponents/InputField';
import LinkButton from './commonComponents/LinkButton';
import { createStudentData } from '../actions/studentRegistrationActions';
import {
  isDataCorrect,
  isValidUserInfo,
  setRegistrationData,
  validateInput,
} from '../utils/registrationFormUtils';
import SelectListInputField from './formComponents/SelectListInputField';
import Button from './commonComponents/Button';
import {
  getNewStudent,
  isCreated,
  isLoading,
} from '../reducers/studentRegistrationReducer';
import TextAreaField from './formComponents/TextAreaField';

const studiesArray = [
  {text:'Level 1  : णमोकार मंत्र, चार मंगल, तीर्थंकर-भगवान, देव दर्शन, जीव-अजीव, दिनचर्या, भावना गीत',
    value: 'Level 1'
  },
  {text:'Level 2  : पाप, कषाय, सदाचार, गति, द्रव्य, देव स्तुति',
    value: 'Level 2'
  },
  {text:'Level 3  : पंच परमेष्ठी, अष्ट मूलगुण, इन्द्रिय, भक्ष्य-अभक्ष्य, द्रव्य,गुण - पर्याय, , देव स्तुति',
    value: 'Level 3'
  },
  {text:'Level 4  : आत्मा-परमात्मा, सात तत्त्व, षट्‍ आवशयक, कर्म, , देव स्तुति',
    value: 'Level 4'
  },
  {text:'Level 5 : देव -शास्त्र - गुरू, सात तत्त्व की भूल, चार अनुयोग, सात व्यसन, १२ भावना',
    value: 'Level 5'
  },
  {text:'Level 6  :  छहढाला - ढाल 1 & 2',
    value: 'Level 6'
  },
  {text:'Level 7 : छहढाला - ढाल 3',
    value: 'Level 7'
  },
  {text: 'Level 8 : छहढाला - ढाल 4',
    value: 'Level 8'
  }
];
const busStops = [
 {text: 'गाँधी नगर मंदिर',
    value: 'Gandhi Nagar Mandir'
  },
{text: 'कालानी मंदिर गली मेन रोड',
    value: 'Kaalani Mandir Gali Main Road'
  },
{text: 'कालानी नगर मंदिर गली मेन रोड - 2',
    value: 'Kaalani Nagar Mandir Gali Main Road - 2'
  },
{text: 'साधना नगर मंदिर गली मेन रोड',
    value: 'Saadhna Nagar Mandir Gali Main Road'
  },
{text: 'अंजनी नगर (60 फुट रोड)',
    value: 'Anjani Nagar(60 Foot Road)'
  },
{text: 'स्मृति नगर मंदिर गली (बांगड़दा रोड)',
    value: 'Smrti Nagar Mandir Gali(Baangarda Road)'
  },
{text: 'पल्हर नगर बांगड़दा रोड (पानी की टंकी)',
    value: 'Palhar Nagar Baangarda Road(Paani ki tanki)'
  },
{text: 'इंदौर तार फैक्टरी (संगम नगर)',
    value: 'Indore Taar Factory(Sangam Nagar)'
  },
{text: 'रामचंद नगर सर्किल (एरोड्रम रोड)',
    value: 'Raamchand Nagar Circle (Aerodrom Road)'
  },
{text: 'छात्रपति नगर मेन रोड (महावीर बाग)',
    value: 'Chhatrapati Nagar Main Road(Mahaveer Bagh)'
  },
{text: 'बड़ा गणपति',
    value: 'Bada Ganpati'
  },
{text: 'राजमोहल्ला (OPP चैत्यालय)',
    value: 'RajMohalla(Opp Chaityalaya)'
  },
  {text: 'रामशाह मंदिर मेन रोड',
    value: 'Ramshah Mandir Main Road'
  },
{text: 'कांच मंदिर मेन रोड (नरसिंह बाजार)',
    value: 'Kaanch Mandir Main Road(Narsingh Bazar)'
  },
{text: 'रामबाग चौराहा (कुसुम टाकीज़)',
    value: 'Rambagh Square(Kusum Talkies)'
  },
  {text: 'चिकमंगलूर चौराहा',
    value: 'Chikmanglur Square'
  },
  {text: 'जीएसआईटीएस सर्किल',
    value: 'GSITS circle'
  },
{text: 'क्लर्क कॉलोनी  ITI मेन रोड',
    value: 'Clerk Colony ITI Main Road'
  },
  {text: 'बजरंग/नंदा नगर मेन रोड (मंदिर)',
    value: 'Bajrang/Nanda Nagar Main Road(Mandir)'
  },
  {text: 'सुखलिया MR10 मंदिर गली',
    value: 'Sukhliya MR10 Mandir gali'
 },
  {text: 'विजय नगर-कृष्णा मिल्क सेंटर',
    value: 'Vijay Nagar - Krishna Milk centre'
  },
  {text: '78 Scheme (मंदिर)',
    value: '78 Scheme (Mandir)'
  },
{text: 'सत्य साई चौराहा (पांच बालयति मदिर)',
    value: 'Satya Sai Square(Paanch Baalyati Mandir)'
  },
{text: 'तुलसी नगर मेन रोड (महालक्ष्मी मंदिर)',
    value: 'Tulsi Nagar Main Road(Mahalaxmi Mandir)'
  },
  {text: 'जावरवाला मंदिर',
    value: 'Jaavarwala Mandir'
  },
{text: 'समवशरण मंदिर',
    value: 'Samwasharan Mandir'
  },
{text: 'गीता भवन',
    value: 'Geeta Bhawan'
  },
{text: 'पलासिया सर्किल',
    value: 'Palasia Circle'
  },
{text: 'कनाड़िया रोड /पत्रकार चौराहा',
    value: 'Kanadiya Road/ Patrakar Square'
  },
{text: 'तिलक नगर  मंदिर',
    value: 'Tilak Nagar Mandir'
  },
{text: 'गोयल नगर मंदिर',
    value: 'Goyal Nagar Mandir'
  },
  {text: 'गोयल नगर बंगाली चौराहा',
    value: 'Goyal Nagar Bengali Square'
  },
  {text: 'सुख शांति/उदय नगर मंदिर',
    value: 'Sukh Shanti/Uday Nagar Mandir'
  },
{text: 'वैभव नगर (शर्मा  स्वीट्स)',
    value: 'Vaibhav Nagar(Sharma Sweets)'
  },
  {text: 'ब्रजेशवरी मंदिर IDA 140 JMB',
    value: 'Brajeshwari Mandir IDA 140 JMB'
  },
  {text: 'मिलन हाईट्स',
    value: 'Milan Heights'
  },
{text: 'भॅवरकुआ बीसीएम',
    value: 'Bhanwarkuwa BCM'
  },
{text: 'सपना संगीता टॉवर सर्किल',
    value: 'Sapna Sangeeta Tower Circle'
  },
{text: 'जैन कोलोनी (अहिंसा  गेट)',
    value: 'Jain Colony(Ahinsa Gate)'
  },
{text: 'रंजीत हनुमान (गुमाश्ता नगर)',
    value: 'Ranjeet Hanuman(Gumashta Nagar)'
  },
  {text: 'महावीर गेट (सुदामा नगर )',
    value: 'Mahavir Gate(Sudama Nagar)'
  },
  {text: 'परिवहन नगर (नितिन ट्रेडर्स गली)',
    value: 'Parivahan Nagar(Nitin Traders Gali)'
  },
  {text: 'वैशाली  नगर गोपुर चौराहा',
    value: 'Vaishali Nagar Gopur Square'
  },
{text: 'चोइथराम सर्किल ',
    value: 'Choithram Circle'
  },
{text: 'राजेंद्र नगर D-MART चौराहा',
    value: 'Rajendra Nagar D-MART Square'
  }
];

const gender = [
  {
    text: 'पुरुष',
    value: 'M',
  },
  {
    text: 'महिला',
    value: 'F'
  }
];
const yesOrNo = [
  {
    text: 'हाँ',
    value: 1
  },
  {
    text: 'नहीं',
    value: 0
  }
];

class StudentRegistrationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      student: {
        name: '',
        fatherName: '',
        gender: '',
        age: '',
        fatherMobile: '',
        motherMobile: '',
        email: '',
        address: '',
        busStop: '',
        course2018: '',
        optIn2018: ''
      },
      isSubmitTriggered: false,
      errorMessage: {
        name: {},
        fatherName: {},
        gender: {},
        age: {},
        fatherMobile: {},
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
    this.checkError({email: '', motherMobile: ''});
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
      return (
        <div className={"popup"}>
          <div className={"popupContainer"}>
            <p>{`आपका रजिस्ट्रेशन "जैन बाल एवं युवा शिविर के लिए हो चूका है |`}</p>
            <p>{`आपका ID: `}<strong>{student['id']}</strong>{` है |`}</p>
             <p>{`आपका सीक्रेट कोड: `}<strong>{student['secretKey']}</strong>{` है |`}</p>
             <p>{`कृपया अपना ID और सीक्रेट कोड ध्यानपूर्वक नोट कर लेवे |`}</p>
             <p>{`शीघ्र ही आपका ID Card आपके क्षेत्रीय संयोजक द्वारा भेजा जायेगा |`}</p>
            <LinkButton
              buttonText={'वापस जाओ'}
              linkPath={'/'}
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
        <h3 className={'registrationFormHeading'}>{'जैन बाल एवं युवा संस्कार शिक्षण शिविर (तृतीय) रजिस्ट्रेशन फॉर्म'}</h3>
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
            label={'पिता का नाम'}
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
            name={'fatherMobile'}
            onInputChange={this._handleInputChange}
            value={this.state.student.fatherMobile}
            isRequired={true}
            errorMessage={this.state.errorMessage.fatherMobile['message']}
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
          <SelectListInputField
            name={'optIn2018'}
            label={'2018 के शिविर की स्वीकृति ?'}
            options={yesOrNo}
            onInputChange={this._handleInputChange}
            value={this.state.student.optIn2018}
            isRequired={true}
            errorMessage={this.state.errorMessage.optIn2018['message']}
          />
          <div className={'registrationFormButtonContainer'}>
            <LinkButton
              buttonText={'वापस जाओ'}
              linkPath={'/'}
            />
            <Button
              buttonText={'रजिस्ट्रेशन करें'}
              onClick={this._submitStudentData}
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
};

StudentRegistrationForm.defaultProps = {
  isLoading: false,
  isCreated: false,
  newStudent: {},
  createStudentData: () => {},
};

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  isCreated: isCreated(state),
  newStudent: getNewStudent(state),
});

export default connect(mapStateToProps, {
  createStudentData,
})(StudentRegistrationForm);

