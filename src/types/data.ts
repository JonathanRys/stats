export type InputDefinition = {
    id: string;
    label: string;
    units?: string;
};

export type DataLink = {
    id: string;
    clickCallback: (id: string) => void,
    validations?: (id: string) => boolean
};
