

export class UpdateWorkOrderStatus {

    constructor(
        public id: number,
        public codeStatus: string,
    ) {}

    static create( props: {[key: string]: any} ): [string?, UpdateWorkOrderStatus?] {
        const { id, codeStatus } = props;

        if ( !id ) return ['id is missing', undefined];
        if ( !codeStatus ) return ['codeStatus is missing', undefined];

        const idWorkOrder = +id;

        return [undefined, new UpdateWorkOrderStatus(idWorkOrder, codeStatus)];
    }

}


