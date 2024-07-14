
export class UpdateWarehousesDto {

    constructor(
        public readonly id: number,
        public readonly name?: string,
    ) {}

    get values() {
        const returnObj: {[key:string]: any} = {};

        if ( this.name ) returnObj.name = this.name; 

        return returnObj;
    }

    static create( props: {[key: string]: any} ): [string?, UpdateWarehousesDto?] {
        const { id, name } = props;

        if ( !id || isNaN( Number(id) ) ) {
            return ['Id must be a valid number..', undefined];
        }

        // Capitalizar y recortar el nombre
        const nameTrimmed = name.trim();
        const nameCapitalized = nameTrimmed.charAt(0).toUpperCase() + nameTrimmed.slice(1).toLowerCase();

        return [undefined, new UpdateWarehousesDto(id, nameCapitalized)];
    }

}

