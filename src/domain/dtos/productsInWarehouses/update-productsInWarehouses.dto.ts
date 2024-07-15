
export class UpdateProductsInWarehousesDto {

    constructor(
        public readonly id: number,
        public readonly branchOfficeId: number,
        public readonly warehouseId: number,
        public readonly productId: number,
        public readonly quantity: number,
    ) {}

    get values() {
        const returnObj: {[key:string]: any} = {};

        if ( this.branchOfficeId ) returnObj.branchOfficeId = this.branchOfficeId;
        if ( this.warehouseId ) returnObj.warehouseId = this.warehouseId;
        if ( this.productId ) returnObj.productId = this.productId;
        if ( this.quantity ) returnObj.quantity = this.quantity;

        return returnObj;
    }

    static create( props: {[key: string]: any} ): [string?, UpdateProductsInWarehousesDto?] {
        const { id, branchOfficeId, warehouseId, productId, quantity } = props;


        if ( !id || isNaN( Number(id) ) ) {
            return ['Id must be a valid number..', undefined];
        }

        return [undefined, new UpdateProductsInWarehousesDto(id, branchOfficeId, warehouseId, productId, quantity)];
    }

}

