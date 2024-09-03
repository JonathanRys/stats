export type stringKeyNumber = {[key: string]: number};

export type stringKeyString = {[key: string]: string};

export type numberKeyString = {[key: number]: string};

export type numberKeyNumber = {[key: number]: number};

export type stringKeyEither = stringKeyNumber | stringKeyString;

export type numberKeyEither = numberKeyNumber | numberKeyString;
