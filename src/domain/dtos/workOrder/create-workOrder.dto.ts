interface Product {
    id: number;
    quantity: number;
}

export class CreateWorkOrderDto {

    constructor(
        public address: string,
        public priceOfLabor: number,
        public priceOfTransfer: number,
        public priceTotal: number,
        public customerId: number,
        public statusId: number,
        public products: Product[]
    ) {}

    static create( props: {[key: string]: any} ): [string?, CreateWorkOrderDto?] {
        const { address, priceOfLabor, priceOfTransfer, priceTotal, customerId, statusId, products } = props;

        if ( !address ) return ['address is missing', undefined];
        if ( !priceOfLabor ) return ['priceOfLabor is missing', undefined];
        if ( !priceOfTransfer ) return ['priceOfTransfer is missing', undefined];
        if ( !priceTotal ) return ['priceTotal is missing', undefined];
        if ( !customerId ) return ['customerId is missing', undefined];
        
        if (!Array.isArray(products)) return ['products should be an array', undefined];
        for(const product of products) {
            if ( typeof product.id !== 'number' ) return ['product id is missing or invalid', undefined];
            if ( typeof product.quantity !== 'number' ) return ['product quantity is missing or invalid', undefined];
        }
        
        return [undefined, new CreateWorkOrderDto(address, priceOfLabor, priceOfTransfer, priceTotal, customerId, statusId, products)];
    }

}

