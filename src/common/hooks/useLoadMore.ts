import {DependencyList, useCallback, useEffect, useState} from "@tarojs/taro";

export interface ReturnValue<Item> {
    loading: boolean;
    loadingMore: boolean;
    data: Item[];
    reload: () => void
    loadMore: () => void
    noMore: boolean;
    total: number | undefined;
}
export type ResultType<Item=any>= {
    total: number;
    data: Item[];
}
export interface Options<Result=ResultType, Item=any> {
    initPageSize?: number;
    incrementSize?: number;
    formatResult?: (result: Result) => ResultType
}
export interface RequestFnParams {
    page: number;
    pageSize: number;
    offset: number;
}

const useLoadMore = <Result = ResultType, Item = any>(fn: (params: RequestFnParams) => Promise<Result>,
                                                      deps: DependencyList, options: Options<Result, Item>) => {
    const {initPageSize=10,incrementSize=10,formatResult} = options;
    const [page, setPage] = useState(1);
    const [total,setTotal]=useState<number>()
    const [data, setData] = useState<Item[]>([]);
    const [count, setCount] = useState(0);  // 这个仅仅是用来驱动useEffect执行loadData的, 没有什么用处
    const [loading, setLoading] = useState(false);

    const loadData = useCallback(() => {
        const params: RequestFnParams = {
            page, pageSize: page === 1 ? initPageSize : incrementSize,
            offset: data.length,
        }
        setLoading(true);
        fn(params).then((result: any | undefined) => {
            if (!result) {
                return;
            }
            const {total: currentTotal, data: currentData} = (formatResult ? formatResult(result.data) : result.data) as any;
            setTotal(currentTotal);
            setData(data.concat(currentData));
            setLoading(false);
        }).catch(err => {
            setLoading(false);
          return err;
        });
    }, [page, initPageSize, incrementSize, data]);

    const loadMore = useCallback(() => {
        if (total && data.length > total) {
            return;
        }
        setCount(count => count + 1);
        setPage(page => page + 1);
    }, [page, count, data, total]);
    const reload = useCallback(() => {
        setPage(1);
        setData([]);
        setCount(count + 1);
    }, [count]);
    useEffect(loadData, [count]);
    return {
        data,
        loading: loading && page === 1,
        loadingMore: loading && page > 1,
        reload: reload,
        loadMore,
        total,
        noMore: total && data.length >= total
    }

};
export default useLoadMore;
