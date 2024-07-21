
export class UpdateEstatusDto {

    constructor(
        public readonly id: number,
        public readonly name?: string,
        public readonly code?: string,
        public readonly color?: string,
    ) {}

    get values() {
        const returnObj: {[key: string]: any} = {};

        if ( this.name ) returnObj.name = this.name;
        if ( this.code ) returnObj.code = this.code;
        if ( this.color ) returnObj.color = this.code;

        return returnObj;
    }

    static create( props: {[key: string]: any} ): [string?, UpdateEstatusDto?] {
        const { id, name, code, color } = props;

        if ( !id || isNaN( Number(id) ) ) {
            return ['Id must be a valid number..', undefined];
        }

        // Capitalizar y recortar el nombre
        const nameTrimmed = name.trim();
        const nameCapitalized = nameTrimmed.charAt(0).toUpperCase() + nameTrimmed.slice(1).toLowerCase();
        const codeTrimmed = code.trim();
        const codeCapitalized = codeTrimmed.charAt(0).toUpperCase() + codeTrimmed.slice(1).toLowerCase();
        const colorTrimmed = color.trim();
        const colorCapitalized = colorTrimmed.charAt(0).toUpperCase() + colorTrimmed.slice(1).toLowerCase();

        return [undefined, new UpdateEstatusDto(id, nameCapitalized, codeCapitalized, colorCapitalized)];
    }

}


