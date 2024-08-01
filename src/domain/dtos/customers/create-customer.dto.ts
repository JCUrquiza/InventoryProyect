
export class CreateCustomerDto {

    constructor(
        public readonly name: string,
        public readonly apellidoPaterno: string,
        public readonly apellidoMaterno: string,
        public readonly email: string,
        public readonly address: string,
        public readonly telephone: string,
        public readonly typeCustomerId: number,
        public readonly branchOfficeId: number,
        public readonly statusId: number,
    ) {}

    static create( props: {[key: string]: any} ): [string?, CreateCustomerDto?] {
        const { name, apellidoPaterno, apellidoMaterno, email, address, telephone, typeCustomerId, branchOfficeId, statusId } = props;

        if ( !name ) return ['The name needs to be added', undefined];
        if ( !apellidoPaterno ) return ['The apellidoPaterno needs to be added', undefined];
        if ( !apellidoMaterno ) return ['The apellidoMaterno needs to be added', undefined];
        if ( !email ) return ['The email needs to be added', undefined];
        if ( !address ) return ['The address needs to be added', undefined];
        if ( !telephone ) return ['The telephone needs to be added', undefined];
        if ( !typeCustomerId ) return ['The typeCustomerId needs to be added', undefined];
        if ( !branchOfficeId ) return ['The branchOfficeId needs to be added', undefined];

        // Capitalizar y recortar:
        const nameTrimmed = name.trim();
        const nameCapitalized = nameTrimmed.charAt(0).toUpperCase() + nameTrimmed.slice(1).toLowerCase();
        const apellidoPaternoTrimmed = apellidoPaterno.trim();
        const apellidoPaternoCapitalized = apellidoPaternoTrimmed.charAt(0).toUpperCase() + apellidoPaternoTrimmed.slice(1).toLowerCase();
        const apellidoMaternoTrimmed = apellidoMaterno.trim();
        const apellidoMaternoCapitalized = apellidoMaternoTrimmed.charAt(0).toUpperCase() + apellidoMaternoTrimmed.slice(1).toLowerCase();

        return [
            undefined,
            new CreateCustomerDto(
                nameCapitalized,
                apellidoPaternoCapitalized,
                apellidoMaternoCapitalized,
                email,
                address,
                telephone,
                typeCustomerId,
                branchOfficeId,
                statusId
            )
        ];
    }

}



