
export class UpdateProductDto {

    constructor(
        public readonly id: number,
        public readonly name?: string,
        public readonly codigoSKU?: string,
        public readonly salePrice?: number,
        public readonly productFamilyId?: number,
    ) {}

    get values() {
        const returnObj: {[key: string]: any} = {};

        if ( this.name ) returnObj.name = this.name;
        if ( this.codigoSKU ) returnObj.codigoSKU = this.codigoSKU;
        if ( this.salePrice ) returnObj.salePrice = this.salePrice;
        if ( this.productFamilyId ) returnObj.productFamilyId = this.productFamilyId;

        return returnObj;
    }

    static create( props: {[key: string]: any} ): [string?, UpdateProductDto?] {
        const { id, name, codigoSKU, salePrice, productFamilyId } = props;

        if ( !id || isNaN( Number(id) ) ) {
            return ['Id must be a valid number..', undefined];
        }

        // Capitalizar y recortar el nombre
        const nameTrimmed = name.trim();
        const nameCapitalized = nameTrimmed.charAt(0).toUpperCase() + nameTrimmed.slice(1).toLowerCase();

        return [undefined, new UpdateProductDto(id, nameCapitalized, codigoSKU, salePrice, productFamilyId)];
    }

}

