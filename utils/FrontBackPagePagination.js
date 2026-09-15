
    export   function FrontPagination(pg , lmt , nbDocuments){
        let page = +pg || 1;
        let limit = +lmt || 10;
        let skip = (page -1) * limit;
        return [page , limit , skip];
    }


