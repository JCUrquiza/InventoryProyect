
export class CreateProductDto {

    constructor(
        public readonly name: string,
        public readonly salePrice: number,
        public readonly productFamilyId: number,
    ) {}

    static create( props: {[key: string]: any} ): [string?, CreateProductDto?] {

        const { name, salePrice, productFamilyId } = props;

        if ( !name ) return ['Name is required', undefined];
        if ( !salePrice ) return ['Sale price is required', undefined];
        if ( !productFamilyId ) return ['productFamilyId is required', undefined];

        const idProductFamily = +productFamilyId;

        return [undefined, new CreateProductDto(name, salePrice, idProductFamily)];
    }

}

