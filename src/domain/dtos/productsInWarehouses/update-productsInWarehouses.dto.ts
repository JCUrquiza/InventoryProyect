
export class UpdateProductsInWarehousesDto {

    constructor(
        public readonly id: number,
        public readonly quantity: number,
    ) {}

    static create( props: {[key: string]: any} ): [string?, UpdateProductsInWarehousesDto?] {
        const { id, quantity } = props;

        if ( !id || isNaN( Number(id) ) ) {
            return ['Id must be a valid number..', undefined];
        }

        if ( !quantity ) return ['quantity is required', undefined];

        const amount = +quantity;

        return [undefined, new UpdateProductsInWarehousesDto(id, amount)];
    }

}

