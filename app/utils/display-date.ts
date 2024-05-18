type DateType = 'year' | 'month' | 'day';

export const displayDate = (inputDate:string, by: DateType):string => {
    const utilLoopMap = new Map<DateType,number>([
        ['year',1],
        ['month', 2],
        ['day',3]
    ])
    const takeNumberArr:string[] = inputDate.split('-');
    const utilLoopCount = utilLoopMap.get(by);
    let formatDate = '';
    for (let i=0; i < utilLoopCount; i++){
        formatDate = formatDate + `${takeNumberArr[i]}/`
    }
    // 最後の'/'だけ取り除く
    return formatDate.slice(0, -1);
}