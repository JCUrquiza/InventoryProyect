

export class CreateProductFamilyDto {

    constructor(
        public readonly name: string,
    ) {}

    static create( props: {[key: string]: any} ): [string?, CreateProductFamilyDto?] {

        const { name } = props;
        
        if ( !name ) return ['Name is required', undefined];

        return [undefined, new CreateProductFamilyDto(name)];
    }

}

