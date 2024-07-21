
export class CreateStatusDto {

    constructor(
        public readonly name: string,
        public readonly code: string,
        public readonly color: string,
    ) {}

    static create( props: {[key: string]: any} ): [string?, CreateStatusDto?] {
        const { name, code, color } = props;

        if ( !name ) return ['Miss name', undefined];
        if ( !code ) return ['Miss code', undefined];
        if ( !color ) return ['Miss color', undefined];

        // Capitalizar y recortar el nombre
        const nameTrimmed = name.trim();
        const nameCapitalized = nameTrimmed.charAt(0).toUpperCase() + nameTrimmed.slice(1).toLowerCase();
        const codeTrimmed = code.trim();
        const codeCapitalized = codeTrimmed.charAt(0).toUpperCase() + codeTrimmed.slice(1).toLowerCase();
        const colorTrimmed = color.trim();
        const colorCapitalized = colorTrimmed.charAt(0).toUpperCase() + colorTrimmed.slice(1).toLowerCase();

        return [undefined, new CreateStatusDto(nameCapitalized, codeCapitalized, colorCapitalized)];
    }

}


