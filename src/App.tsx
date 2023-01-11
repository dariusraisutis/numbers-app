import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import CustomTextBox from './components/CustomTextBox';
import TextBoxTypeEnum from './enums/TextBoxTypeEnum';
import CustomButton from './components/CustomButton';
import RequestTypeEnum from './enums/RequestTypeEnum';

const App = () => {
  const [numberInputValue, setNumberInputValue] = useState(0);
  const [dayInputValue, setDayInputValue] = useState(0);
  const [monthInputValue, setMonthInputValue] = useState(0);
  const [requestType, setRequestType] = useState('');
  const [result, setResult] = useState('');
  const [random, setRandom] = useState(false);
  
  const handleNumberInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setNumberInputValue(+event.target.value);
  }

  const handleDayInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setDayInputValue(+event.target.value);
  }

  const handleMonthInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setMonthInputValue(+event.target.value);
  }

  const handleRadioButtonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRequestType(event.target.value);
  }

  const getRequestUrl = () => {
    const getRequestUrlEndPoint = () => {
      if (random) { 
        return `random/${requestType}`;
      } else {
          switch(requestType) {
            case RequestTypeEnum.Math: return `${numberInputValue}/math`;
            case RequestTypeEnum.Date: return `${monthInputValue}/${dayInputValue}/date`;
            case RequestTypeEnum.Year: return `${numberInputValue}/year`;
            default: return `${numberInputValue}`;
          }
      }
    }
      return `http://numbersapi.com/${getRequestUrlEndPoint()}`;
  }
  
  const handleOnButtonClick = async (event: React.SyntheticEvent<HTMLButtonElement>): Promise<void> => {
    event.preventDefault();
    try {
      let {data} =  await axios.get(getRequestUrl());
      setResult(data);
    }
    catch(error: unknown) {
      console.log(error instanceof Error ? error.message : String(error));
    }
  }

  const handleRandomChecboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRandom(event.currentTarget.checked);
  }

  return <>
    <div className='App'>
        <legend>
          {'Select type of request you would like to make'}
        </legend>
      <div className='radio-group'>
        <div>
          <input type={'radio'} name={'requestType'} value={RequestTypeEnum.Trivia} onChange={handleRadioButtonChange} />
          <label htmlFor='trivia'>{'Trivia'}</label>
        </div>
        <div>
          <input type={'radio'} name={'requestType'} value={RequestTypeEnum.Math} onChange={handleRadioButtonChange} />
          <label htmlFor='math'>{'Math'}</label>
        </div>
        <div>
          <input type={'radio'} name={'requestType'} value={RequestTypeEnum.Date} onChange={handleRadioButtonChange} />
          <label htmlFor='date'>{'Date'}</label>
        </div>
        <div>
          <input type={'radio'} name={'requestType'} value={RequestTypeEnum.Year} onChange={handleRadioButtonChange} />
          <label htmlFor='year'>{'Year'}</label>
        </div>
        <div>
          <input type={'checkbox'} onChange={handleRandomChecboxChange} checked={random} />
          <label htmlFor='random'>{'Random'}</label>
        </div>
      </div>
      {
        !random 
          ? requestType === RequestTypeEnum.Date
            ? <div>
                <label>{'Enter day:'}</label>
                <CustomTextBox 
                  type={TextBoxTypeEnum.Number} 
                  handleOnChange={handleDayInputChange} 
                  numberInputLimit={31} 
                  value={dayInputValue} />

                <label>{'Enter month:'}</label>
                <CustomTextBox 
                  type={TextBoxTypeEnum.Number} 
                  handleOnChange={handleMonthInputChange} 
                  numberInputLimit={12} 
                  value={monthInputValue} />
              </div>
            : <div>
                <label>{'Enter number:'}</label>
                <CustomTextBox 
                  type={TextBoxTypeEnum.Number} 
                  handleOnChange={handleNumberInputChange} 
                  value={numberInputValue} />
              </div>
          : null
      }
      <CustomButton buttonTitle='Get number fact..' handleOnClick={handleOnButtonClick} />
      <div>
        <textarea disabled={true} rows={10} cols={60} value={result} />
      </div>
    </div>
  </>
}

export default App;
