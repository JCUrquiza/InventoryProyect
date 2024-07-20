
export class CreateCompanyDto {

    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly address: string,
    ) {}

    static create( props: {[key:string]: any} ): [string?, CreateCompanyDto?] {

        const { name, email, address } = props;

        if ( !name ) return ['Name of company is necesary', undefined];
        if ( !email ) return ['Email of company is necesary', undefined];
        if ( !address ) return ['Address of company is necesary', undefined];

        // Capitalizar y recortar el nombre
        const nameTrimmed = name.trim();
        const nameCapitalized = nameTrimmed.charAt(0).toUpperCase() + nameTrimmed.slice(1).toLowerCase();

        return [undefined, new CreateCompanyDto(nameCapitalized, email, address)];
    }

}


