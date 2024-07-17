
export class DeleteWarehousesByBranchDto {

    constructor(
        public readonly idWarehouseByBranch: number,
        public readonly idWarehouse: number,
        public readonly idBranchOffice: number,
    ) {}

    static create( props: {[key: string]: any} ): [string?, DeleteWarehousesByBranchDto?] {
        const { idWarehouseByBranch, idWarehouse, idBranchOffice } = props;

        if ( !idWarehouseByBranch && !idWarehouse && !idBranchOffice ) {
            return ['At least indicate one of these three: idWarehouseByBranch or idWarehouse or idBranchOffice', undefined];
        }
        
        if ((idWarehouseByBranch && idWarehouse) || (idWarehouseByBranch && idBranchOffice) || (idWarehouse && idBranchOffice)) {
            return ['Only indicate one parameter: idWarehouseByBranch or idWarehouse or idBranchOffice', undefined];
        }
        
        const warehouseByBranchId = +idWarehouseByBranch;
        const warehouseId = +idWarehouse;
        const branchOfficeId = +idBranchOffice;

        return [undefined, new DeleteWarehousesByBranchDto(warehouseByBranchId, warehouseId, branchOfficeId)];
    }

}



