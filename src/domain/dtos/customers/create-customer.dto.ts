
export class CreateCustomerDto {

    constructor(
        public readonly name: string,
        public readonly apellidoPaterno: string,
        public readonly apellidoMaterno: string,
        public readonly email: string,
        public readonly address: string,
        public readonly phone: string,
    ) {}

    static create( props: {[key: string]: any} ): [string?, CreateCustomerDto?] {

        return [];
    }

}



