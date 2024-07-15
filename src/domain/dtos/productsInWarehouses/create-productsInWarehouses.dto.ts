
export class CreateProductsInWarehousesDto {

    constructor(
        public readonly branchOfficeId: number,
        public readonly warehouseId: number,
        public readonly productId: number,
        public readonly quantity: number,
    ) {}

    static create( props: {[key:string]: any} ): [string?, CreateProductsInWarehousesDto?] {

        const { branchOfficeId, warehouseId, productId, quantity } = props;

        if ( !branchOfficeId ) return ['branchOfficeId is required', undefined];
        if ( !warehouseId ) return ['warehouseId is required', undefined];
        if ( !productId ) return ['productId is required', undefined];
        if ( !quantity ) return ['quantity is required', undefined];

        const idBranchOffice = +branchOfficeId;
        const idWarehouse = +warehouseId;
        const idProduct = +productId;

        return [undefined, new CreateProductsInWarehousesDto(idBranchOffice, idWarehouse, idProduct, quantity)];
    }

}

