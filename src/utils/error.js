function handleResponseError(response) {
    throw new Error("HTTP error, status = " + response.status);
}
function handleError(error) {
    console.log(error.message);
}
export { handleError, handleResponseError };