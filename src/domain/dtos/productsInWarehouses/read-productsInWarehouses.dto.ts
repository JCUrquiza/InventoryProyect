
export class ReadProductsInWarehousesDto {

    constructor(
        public readonly branchOfficeId: number,
        public readonly warehouseId: number,
    ) {}

    static create( props: {[key:string]: any} ): [string?, ReadProductsInWarehousesDto?] {

        const { branchOfficeId, warehouseId } = props;

        if ( !branchOfficeId ) return ['branchOfficeId is required', undefined];
        if ( !warehouseId ) return ['warehouseId is required', undefined];
        
        const idBranchOffice = +branchOfficeId;
        const idWarehouse = +warehouseId;
        
        return [undefined, new ReadProductsInWarehousesDto(idBranchOffice, idWarehouse)];
    }

}

