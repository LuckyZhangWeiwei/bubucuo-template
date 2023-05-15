export default function Item({
    label,
    children,
    tips,
}: {
    label: string;
    children: JSX.Element;
    tips?: string;
}) {
    return (
        <div className="relative flex justify-start items-center px-2 mt-4">
            <label className="text-sm w-20 text-slate-600 font-bold">
                {label}
            </label>
            {children}
            <p className="hidden absolute bottom--8 left-20 text-sm text-orange-400 hover:block">
                {tips}
            </p>
        </div>
    );
}
