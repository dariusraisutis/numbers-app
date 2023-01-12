import React from 'react';
import TextBoxTypeEnum from '../enums/TextBoxTypeEnum';

interface ICustomTextBoxProps extends React.HTMLAttributes<HTMLInputElement> {
    type: TextBoxTypeEnum;
    value?: number | string;
}

const CustomTextBox = (props: ICustomTextBoxProps) : JSX.Element => {
    const {type, value, onChange, ...restProps} = props;
    return <>
            <input
                type={type} 
                value={value} 
                onChange={onChange}
                {...restProps}
            />       
        </>;
}

export default CustomTextBox;
