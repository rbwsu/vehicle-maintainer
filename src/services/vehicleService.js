const apiKey = 'sj63ecssxwhf8bstdy7e9t4f';
const fetchList = `http://api.edmunds.com/api/vehicle/v2/makes?fmt=json&api_key=${apiKey}`;
const fetchSafetyBulletin = `https://api.edmunds.com/v1/api/maintenance/servicebulletinrepository/findbymodelyearid?fmt=json&api_key=${apiKey}&`;

const makeList = () => fetch(fetchList)
                        .then(res => res.ok ? res.json() : Promise.reject(res));

const safetyBulletin = id => fetch(fetchSafetyBulletin + `modelyearid=${id}`)
                                .then(res => res.ok ? res.json() : Promise.reject(res));

export {makeList, safetyBulletin}