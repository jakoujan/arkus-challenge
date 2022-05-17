import { MatPaginatorIntl } from "@angular/material/paginator";
import { constants } from "src/environments/environment";
import { ISession } from "../interfaces/entities";

const spanishRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length == 0 || pageSize == 0) { return `0 de ${length}`; }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} de ${length}`;
}

export function getSpanishPaginatorIntl() {
    const paginatorIntl = new MatPaginatorIntl();

    paginatorIntl.itemsPerPageLabel = 'Registros por pagina:';
    paginatorIntl.nextPageLabel = 'Siguiente';
    paginatorIntl.previousPageLabel = 'Anterior';
    paginatorIntl.getRangeLabel = spanishRangeLabel;

    return paginatorIntl;
}

export function validateProfile(data: any, session: ISession): boolean {
    if (data.validate) {
        return session.user.userRole === constants.ROLE_ADMIN ? true : data.role === session.user.userRole;
    }
    return true;
}
