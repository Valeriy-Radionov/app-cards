type ParamsType = { [key: string]: string }
export const getQueryParams  = (searchParams: URLSearchParams, id?: string) => {
    const params: ParamsType = {
        cardsPack_id: id || '',
        page: '1',
        pageCount: '10'
    }

    searchParams.forEach((value, key) => {
        if (key) {
            params[key] = value
        }
    })
    return params
}

export const checkParamsForQuery = (params: ParamsType, setSearchParams: (params: ParamsType) => void  ) => {
    const nameParams = Object.keys(params);
    let resultSearchParams = {};
    nameParams.forEach(name => {
        if (params[name]) {
            resultSearchParams = {...resultSearchParams, [name]: params[name]}
        }
    })
    setSearchParams(resultSearchParams);
    return resultSearchParams
}

