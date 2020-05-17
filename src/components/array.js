export const sortArray = ({ array, sortByProperty, isAscending = false }) => {
    return array.sort((a, b) => {
        return (isAscending ? a[sortByProperty] - b[sortByProperty] : b[sortByProperty] - a[sortByProperty])
    })
}