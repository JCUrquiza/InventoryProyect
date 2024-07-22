
export class CreateTicketDto {

    constructor(
        public readonly description: string,
        public readonly catalogueId: number,
    ) {}

    static create( props: {[key: string]: any}): [string?, CreateTicketDto?] {
        const { description, catalogueId, userId } = props;

        if ( !description ) return ['Missing description', undefined];
        if ( !catalogueId ) return ['Missing catalogueId', undefined];
        
        return [undefined, new CreateTicketDto(description, catalogueId)];
    }

}


