
export class UpdateProductFamilyDto {

    constructor(
        public readonly id: number,
        public readonly name?: string
    ) {}

    get values() {
        const returnObj: {[key: string]: any} = {};

        if ( this.name ) returnObj.name = this.name; 

        return returnObj;
    }

    static create( props: {[key: string]: any} ): [string?, UpdateProductFamilyDto?] {
        const { id, name } = props;

        if ( !id || isNaN( Number(id) ) ) {
            return ['Id must be a valid number..', undefined];
        }

        return [undefined, new UpdateProductFamilyDto(id, name)];
    }

}

