export function TextCmp(props: { value: any }) {
    const { value } = props;
    return <>{value}</>;
}

export function ImgCmp(props: { value: any }) {
    const { value } = props;
    return <img className="w-full h-full" src={value} alt="" />;
}
