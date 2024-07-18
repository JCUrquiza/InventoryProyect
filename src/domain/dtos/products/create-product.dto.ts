
export class CreateProductDto {

    constructor(
        public readonly name: string,
        public readonly codigoSKU: string,
        public readonly salePrice: number,
        public readonly productFamilyId: number,
    ) {}

    static create( props: {[key: string]: any} ): [string?, CreateProductDto?] {

        const { name, codigoSKU, salePrice, productFamilyId } = props;

        if ( !name ) return ['Name is required', undefined];
        if ( !codigoSKU ) return ['codigoSKU is required', undefined];
        if ( !salePrice ) return ['Sale price is required', undefined];
        if ( !productFamilyId ) return ['productFamilyId is required', undefined];

        const idProductFamily = +productFamilyId;

        // Capitalizar y recortar el nombre
        const nameTrimmed = name.trim();
        const nameCapitalized = nameTrimmed.charAt(0).toUpperCase() + nameTrimmed.slice(1).toLowerCase();

        return [undefined, new CreateProductDto(nameCapitalized, codigoSKU, salePrice, idProductFamily)];
    }

}

