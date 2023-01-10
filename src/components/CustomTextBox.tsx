import React from 'react';
import TextBoxTypeEnum from '../enums/TextBoxTypeEnum';

interface ICustomTextBoxProps {
    type: TextBoxTypeEnum;
    numberInputLimit?: number;
    value?: number | string;
    handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomTextBox = (props: ICustomTextBoxProps) : JSX.Element => {
    const {type, numberInputLimit, value, handleOnChange} = props;
    return <>
            <input type={type} max={numberInputLimit} value={value} onChange={handleOnChange} />       
        </>;
}

export default CustomTextBox;
