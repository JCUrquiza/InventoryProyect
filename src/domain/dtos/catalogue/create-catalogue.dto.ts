
export class CreateCatalogueDto {

    constructor(
        public readonly name: string,
        public readonly module: string,
    ) {}

    static create( props: {[key: string]: any} ): [string?, CreateCatalogueDto?] {
        const { name, module } = props;

        if ( !name ) return ['Miss name', undefined];
        if ( !module ) return ['Miss module', undefined];

        // Capitalizar y recortar el nombre
        const nameTrimmed = name.trim();
        const nameCapitalized = nameTrimmed.charAt(0).toUpperCase() + nameTrimmed.slice(1).toLowerCase();
        const moduleTrimmed = module.trim();
        const moduleCapitalized = moduleTrimmed.charAt(0).toUpperCase() + moduleTrimmed.slice(1).toLowerCase();

        return [undefined, new CreateCatalogueDto(nameCapitalized, moduleCapitalized)];
    }

}




