
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
        if ( this.color ) returnObj.color = this.color;

        return returnObj;
    }

    static create( props: {[key: string]: any} ): [string?, UpdateEstatusDto?] {
        const { id, name, code, color } = props;

        if ( !id || isNaN( Number(id) ) ) {
            return ['Id must be a valid number..', undefined];
        }

        // Capitalizar y recortar el nombre
        let newName = name;
        let newCode = code;
        let newColor = color;
        if ( name !== undefined ) {
            const nameTrimmed = name.trim();
            const nameCapitalized = nameTrimmed.charAt(0).toUpperCase() + nameTrimmed.slice(1).toLowerCase();
            newName = nameCapitalized;
        }
        if ( code !== undefined ) {
            const codeTrimmed = code.trim();
            const codeCapitalized = codeTrimmed.charAt(0).toUpperCase() + codeTrimmed.slice(1).toLowerCase();
            newCode = codeCapitalized;
        }
        if ( color !== undefined ) {
            const colorTrimmed = color.trim();
            const colorCapitalized = colorTrimmed.charAt(0).toUpperCase() + colorTrimmed.slice(1).toLowerCase();
            newColor = colorCapitalized;
        }

        return [undefined, new UpdateEstatusDto(id, newName, newCode, newColor)];
    }

}


