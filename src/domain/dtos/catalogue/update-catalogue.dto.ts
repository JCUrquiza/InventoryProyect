
export class UpdateCatalogueDto {

    constructor(
        public readonly id: number,
        public readonly name?: string,
        public readonly module?: string,
    ) {}

    get values() {
        const returnObj: {[key: string]: any} = {};

        if ( this.name ) returnObj.name = this.name;
        if ( this.module ) returnObj.module = this.module;

        return returnObj;
    }

    static create( props: {[key: string]: any} ): [string?, UpdateCatalogueDto?] {
        const { id, name, module } = props;

        if ( !id || isNaN( Number(id) ) ) {
            return ['Id must be a valid number..', undefined];
        }

        // Capitalizar y recortar el nombre
        const nameTrimmed = name.trim();
        const nameCapitalized = nameTrimmed.charAt(0).toUpperCase() + nameTrimmed.slice(1).toLowerCase();
        const moduleTrimmed = module.trim();
        const moduleCapitalized = moduleTrimmed.charAt(0).toUpperCase() + moduleTrimmed.slice(1).toLowerCase();

        return [undefined, new UpdateCatalogueDto(id, nameCapitalized, moduleCapitalized)]
    }

}

