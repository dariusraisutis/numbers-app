
interface ICustomButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    buttonTitle: string;
}

const CustomButton = (props: ICustomButtonProps) : JSX.Element => {
    const {buttonTitle, onClick, ...restProps} = props;
    return <>
        <button onClick={onClick} {...restProps}>
            {buttonTitle}
        </button>
    </>;
}

export default CustomButton;
