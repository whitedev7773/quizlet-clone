// location.search
let url = "";
let urlSearchParams = new URL("https://localhost/").searchParams;

export function SetUrl(location_search) {
    url = location_search;

    urlSearchParams = new URL(url).searchParams;
    console.log(`url 지정함 [${url}]`);
}

export function GetQueryOf(key) {
    if (url != "" && urlSearchParams.has(key)) {
        const query = urlSearchParams.get(key);
        console.log(`Query 값 요청 ${key} -> ${query}`);
        return query;
    }
    else {
        throw new Error("url or query is required");
    }
};

export function GetAllQueryOf(key) {
    if (url != "" && urlSearchParams.has(key)) {
        const query = urlSearchParams.getAll(key);
        console.log(`복수 Query 값 요청 ${key} -> ${query}`);
        return query;
    }
    else {
        throw new Error('url or query is required');
    }
};