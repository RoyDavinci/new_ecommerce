import config from "../config";

export const paginatorCleaner = (totalCount: number, pageNumber: string, pageSize: string) => {
    const ppageNumber = pageNumber && typeof parseInt(pageNumber, 10) === "number" ? Math.max(1, parseInt(pageNumber, 10)) : 1;
    const ppageSize = pageSize && typeof parseInt(pageSize, 10) === "number" ? Math.max(config.server.DEFAULT_PAGE_SIZE, parseInt(pageSize, 10)) : parseInt(config.server.DEFAULT_PAGE_SIZE, 10);

    const skip = (ppageNumber - 1) * ppageSize;
    const limit = ppageSize;
    const counts = totalCount;
    const pagesize = ppageSize;
    const pagenumber = ppageNumber;
    const totalpages = totalCount > ppageSize ? Math.ceil(totalCount / ppageSize) : 1;
    const haspreviouspage = pagenumber > 1;
    const hasnextpage = totalpages > pagenumber;

    return { skip, limit, counts, pagesize, pagenumber, totalpages, haspreviouspage, hasnextpage };
};
