const apiKey = 'sj63ecssxwhf8bstdy7e9t4f';
const fetchList = `http://api.edmunds.com/api/vehicle/v2/makes?fmt=json&api_key=${apiKey}`;
const fetchSafetyBulletin = `https://api.edmunds.com/v1/api/maintenance/recallrepository/findbymodelyearid?fmt=json&api_key=${apiKey}&`;
const fetchPhotos = ``;

const makeList = () => fetch(fetchList)
                        .then(res => res.ok ? res.json() : Promise.reject(res));

const recallList = id => fetch(fetchSafetyBulletin + `modelyearid=${id}`)
                                .then(res => res.ok ? res.json() : Promise.reject(res));

const styleList = (make,model,year) => fetch(`https://api.edmunds.com/api/vehicle/v2/${make}/${model}/${year}/styles?fmt=json&api_key=${apiKey}`)
                                        .then(res => res.ok ? res.json() : Promise.reject(res));

export {makeList, recallList, styleList}