

export class UpdateBranchOfficeDto {

    constructor(
        public readonly id: number,
        public readonly name?: string,
        public readonly address?: string,
        public readonly email?: string,
        public readonly state?: string,
        public readonly companyId?: number,
    ) {}
    
    get values() {
        const returnObj: {[key: string]: any} = {}

        if ( this.name ) returnObj.name = this.name;
        if ( this.address ) returnObj.address = this.address;
        if ( this.email ) returnObj.email = this.email;
        if ( this.state ) returnObj.state = this.state;
        if ( this.companyId ) returnObj.companyId = this.companyId;

        return returnObj;
    }

    static create( props: {[key: string]: any} ): [string?, UpdateBranchOfficeDto?] {
        const { id, name, address, email, state, companyId } = props;

        if ( !id || isNaN( Number(id) ) ) {
            return ['Id must be a valid number..', undefined];
        }

        return [undefined, new UpdateBranchOfficeDto(id, name, address, email, state, companyId)];
    }

}

