export type ParametersDto = {
    acquirerId: string;
    branchId: string;
    code: string;
    terminalId: string;
    fiscalCode: string;
    printer: string;
    scanner: string;
};

export type PanInfoDto = {
   panInfo: Array<PanDto>; 
};

export type PanDto = {
    pan: string;
    circuits: Array<string>;
    bankName: string;
};

export type IbanListDto = {
    IBANlist: Array<IbanDto>; 
 };
 
export type IbanDto = {
     IBAN: string;
     bankName: string;
 };