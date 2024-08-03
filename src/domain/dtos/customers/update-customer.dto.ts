
export class UpdateCustomerDto {

    constructor(
        public readonly id: number,
        public readonly name?: string,
        public readonly apellidoPaterno?: string,
        public readonly apellidoMaterno?: string,
        public readonly email?: string,
        public readonly address?: string,
        public readonly telephone?: string,
        public readonly typeCustomerId?: number,
        public readonly branchOfficeId?: number,
        public readonly statusId?: number,
    ) {}

    get values() {
        const returnObj: {[key: string]: any} = {};

        if ( this.name ) returnObj.name = this.name;
        if ( this.apellidoPaterno ) returnObj.apellidoPaterno = this.apellidoPaterno;
        if ( this.apellidoMaterno ) returnObj.apellidoMaterno = this.apellidoMaterno;
        if ( this.email ) returnObj.email = this.email;
        if ( this.address ) returnObj.address = this.address;
        if ( this.telephone ) returnObj.telephone = this.telephone;
        if ( this.typeCustomerId ) returnObj.typeCustomerId = this.typeCustomerId;
        if ( this.branchOfficeId ) returnObj.branchOfficeId = this.branchOfficeId;
        if ( this.statusId ) returnObj.statusId = this.statusId;

        return returnObj;
    }

    static create( props: {[key:string]: any} ): [string?, UpdateCustomerDto?] {
        const {
            id,
            name,
            apellidoPaterno,
            apellidoMaterno,
            email,
            address,
            telephone,
            typeCustomerId,
            branchOfficeId,
            statusId
        } = props;

        if ( !id || isNaN( Number(id) ) ) {
            return ['Id must be a valid number..', undefined];
        }

        // Capitalizar y recortar
        let nombre: string | undefined;
        if (name !== undefined) {
            const nameTrimmed = name.trim();
            if (nameTrimmed.length > 0) {
                nombre = nameTrimmed.charAt(0).toUpperCase() + nameTrimmed.slice(1).toLowerCase();
            }
        }
        let aPaterno: string | undefined;
        if (apellidoPaterno !== undefined) {
            const aPaternoTrimmed = apellidoPaterno.trim();
            if (aPaternoTrimmed.length > 0) {
                aPaterno = aPaternoTrimmed.charAt(0).toUpperCase() + aPaternoTrimmed.slice(1).toLowerCase();
            }
        }
        let aMaterno: string | undefined;
        if (apellidoMaterno !== undefined) {
            const aMaternoTrimmed = apellidoMaterno.trim();
            if (aMaternoTrimmed.length > 0) {
                aMaterno = aMaternoTrimmed.charAt(0).toUpperCase() + aMaternoTrimmed.slice(1).toLowerCase();
            }
        }

        return [
            undefined,
            new UpdateCustomerDto(
                id,
                nombre,
                aPaterno,
                aMaterno,
                email,
                address,
                telephone,
                typeCustomerId,
                branchOfficeId,
                statusId
            )
        ];
    }

}



