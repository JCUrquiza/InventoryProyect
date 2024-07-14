
export class CreateWarehousesDto {

    constructor(
        public readonly name: string
    ) {}

    static create( props: {[key:string]: any} ): [string?, CreateWarehousesDto?] {
        const { name } = props;

        if ( !name ) return ['Name is required', undefined];
        
        // Capitalizar y recortar el nombre
        const nameTrimmed = name.trim();
        const nameCapitalized = nameTrimmed.charAt(0).toUpperCase() + nameTrimmed.slice(1).toLowerCase();

        return [undefined, new CreateWarehousesDto(nameCapitalized)];
    }

}


