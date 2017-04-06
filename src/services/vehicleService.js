const apiKey = 'sj63ecssxwhf8bstdy7e9t4f';
const fetchList = `http://api.edmunds.com/api/vehicle/v2/makes?fmt=json&api_key=${apiKey}`;

const makeList = () => fetch(fetchList)
                        .then(res => res.ok ? res.json() : Promise.reject(res));

export {makeList}