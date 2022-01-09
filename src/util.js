export const sortData = (data) => {
    const sortedData = [...data];

    //Descending order (largest to lowest) 
    return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1))
}