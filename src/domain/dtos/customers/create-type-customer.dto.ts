
export class CreateTypeCustomerDto {

    constructor(
        public readonly name: string
    ) {}

    static create( props: {[key:string]: any} ): [string?, CreateTypeCustomerDto?] {
        const { name } = props;

        if ( !name ) return ['Miss name', undefined];

        return [undefined, new CreateTypeCustomerDto(name)];
    }

}


