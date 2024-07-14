
export class CreateBranchOfficeDto {

    constructor(
        public readonly name: string,
        public readonly address: string,
        public readonly email: string,
        public readonly state: string,
        public readonly companyId: number,
    ) {}

    static create( props: {[key:string]: any}): [string?, CreateBranchOfficeDto?] {

        const { name, address, email, state, companyId } = props;

        if ( !name ) return ['Name is required', undefined];
        if ( !address ) return ['Address is required', undefined];
        if ( !email ) return ['Email is required', undefined];
        if ( !state ) return ['State is required', undefined];
        if ( !companyId ) return ['Company is required', undefined];

        const idCompany = +companyId;

        // Capitalizar y recortar el nombre
        const nameTrimmed = name.trim();
        const nameCapitalized = nameTrimmed.charAt(0).toUpperCase() + nameTrimmed.slice(1).toLowerCase();
        // Capitalizar y recortar el estado
        const stateTrimmed = state.trim();
        const stateCapitalized = stateTrimmed.charAt(0).toUpperCase() + stateTrimmed.slice(1).toLowerCase();

        return [undefined, new CreateBranchOfficeDto(nameCapitalized, address, email, stateCapitalized, idCompany)];
    }

}

