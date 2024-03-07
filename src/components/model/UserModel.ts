export type JwtUser = {
	id?:string;
    email?: string;
};

export type UserAction = {
    id: string;
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
};

export type RootLinkType = {
    element: JSX.Element;
    href?: string;
    ariaLabel: string;
    title: string;
};