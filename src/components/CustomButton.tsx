interface ICustomButtonProps {
    buttonTitle: string;
    handleOnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CustomButton = (props: ICustomButtonProps) : JSX.Element => {
    const {buttonTitle, handleOnClick} = props;
    return <>
        <button onClick={handleOnClick}>
            {buttonTitle}
        </button>
    </>;
}

export default CustomButton;