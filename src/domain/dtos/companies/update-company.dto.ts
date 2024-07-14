
export class UpdateCompanyDto {

    constructor(
        public readonly id: number,
        public readonly name?: string,
        public readonly email?: string,
        public readonly address?: string,
    ) {}

    get values() {
        const returnObj: {[key: string]: any} = {};

        if ( this.name ) returnObj.name = this.name; 
        if ( this.email ) returnObj.email = this.email; 
        if ( this.address ) returnObj.address = this.address; 

        return returnObj;
    }

    static create( props: {[key: string]: any} ): [string?, UpdateCompanyDto?] {
        const { id, name, email, address } = props;

        if ( !id || isNaN( Number(id) ) ) {
            return ['Id must be a valid number..', undefined];
        }

        // Capitalizar y recortar el nombre
        const nameTrimmed = name.trim();
        const nameCapitalized = nameTrimmed.charAt(0).toUpperCase() + nameTrimmed.slice(1).toLowerCase();

        return [undefined, new UpdateCompanyDto(id, nameCapitalized, email, address)];
    }

}


