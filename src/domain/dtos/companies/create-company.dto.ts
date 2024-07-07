
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

        return [undefined, new CreateCompanyDto(name, email, address)];
    }

}


