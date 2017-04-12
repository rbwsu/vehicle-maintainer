const apiKey = 'sj63ecssxwhf8bstdy7e9t4f';
const photoKey = '9ru9jb3zct2z2nbugrg2479h';
const fetchList = `http://api.edmunds.com/api/vehicle/v2/makes?fmt=json&api_key=${apiKey}`;
const fetchSafetyBulletin = `https://api.edmunds.com/v1/api/maintenance/recallrepository/findbymodelyearid?fmt=json&api_key=${apiKey}&`;
const fetchMaintenance = `https://api.edmunds.com/v1/api/maintenance/actionrepository/findbymodelyearid?fmt=json&api_key=${apiKey}`;

const makeList = () => fetch(fetchList)
    .then(res => res.ok ? res.json() : Promise.reject(res));

const recallList = id => fetch(fetchSafetyBulletin + `modelyearid=${id}`)
    .then(res => res.ok ? res.json() : Promise.reject(res));

const photoList = (make,model,year) => fetch(`https://api.edmunds.com/api/media/v2/${make}/${model}/${year}/photos?api_key=${photoKey}&fmt=json&width=815&shottype=FQ`)
                                .then(res => res.ok ? res.json() : Promise.reject(res));

const findModelsByMake = (vehicleData, vehicleMake) => {
    return vehicleData.filter(make => make.name === vehicleMake)
        .map(make => make.models)
        .map(models => models.map(model => model.name))
        .reduce((prev, curr, i) => curr)
};

const findYearsByModelAndMake = (vehicleData, vehicleMake, vehicleModel) => {
    return vehicleData.filter(make => make.name === vehicleMake)
        .map(make => make.models)
        .map(models => models.filter(model => model.name === vehicleModel))
        .reduce((prev, curr, i) => curr)
        .map(model => model.years)
        .map(years => years.map(year => year.year))
        .reduce((prev, curr, i) => curr)
};

const findNiceVehicle = (vehicleData, vehicleMake, vehicleModel) => {
    const niceMake = findNiceMake(vehicleData,vehicleMake);
}

const findNiceMake = (vehicleData, vehicleMake) => {
    return vehicleData.filter(make => make.name === vehicleMake)
            .map(make => make.niceName)
            .reduce((prev,curr,i) => curr);
};

const findNiceModel = (vehicleData, vehicleMake, vehicleModel) => {
    return vehicleData.filter(make => make.name === vehicleMake)
        .map(make => make.models)
        .map(models => models.filter(model => model.name === vehicleModel))
        .reduce((prev, curr, i) => curr)
        .map(model => model.niceName)
        .reduce((prev, curr, i) => curr)
}

const findPhotoLink = (photos) => {
    console.log(photos);
    if (photos && photos.length > 0) {
        const prefix = 'https://media.ed.edmunds-media.com';
        const link = photos.map(photo => photo.sources)
                .reduce((prev,curr,i) => prev)
                .map(source => source.link)
                .map(link => link.href)
                .reduce((prev,curr,i) => curr);
        return prefix + link;
    } else {
        return undefined;
    }
}

const reviewList = (make,model,year) =>
    fetch(`https://api.edmunds.com/api/vehiclereviews/v2/${make}/${model}/${year}?fmt=json&api_key=${apiKey}`)
        .then(res => res.ok ? res.json() : Promise.reject(res))

const maintenanceList = id => 
    fetch(fetchMaintenance + `&modelyearid=${id}`)
        .then(res => res.ok ? res.json() : Promise.rejct(res))
        .then(res => res.actionHolder)

export { makeList, recallList, photoList, findModelsByMake, findYearsByModelAndMake, findNiceMake, findNiceModel, findPhotoLink, reviewList, maintenanceList }