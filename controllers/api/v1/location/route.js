const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const readJsonFile = (filename) => {
    const filePath = path.join(appDir + '/location_data/' + filename);
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

router.get('/provinces', (req, res) => {
    const provincesArray = readJsonFile('province.json');
    const provinces = provincesArray[0]
    res.json(provinces);
});

router.get('/regencies/:provinceId', (req, res) => {
    const provinceId = req.params.provinceId;
    if (provinceId.length < 2) {
        return res.status(400).json({ error: 'Province ID must be at least 2 digits long' });
    }

    const regenciesArray = readJsonFile('regency.json');
    const regencies = regenciesArray[0]; // Get the single object inside the array
    
    const filteredRegencies = Object.keys(regencies).reduce((result, key) => {
        if (key.startsWith(provinceId)) {
            result[key] = regencies[key];
        }
        return result;
    }, {});
    
    res.json(filteredRegencies);
});

router.get('/districts/:regencyId', (req, res) => {
    const regencyId = req.params.regencyId;
    if (regencyId.length < 4) {
        return res.status(400).json({ error: 'Regency ID must be at least 4 digits long' });
    }

    const districtsArray = readJsonFile('district.json');
    const districts = districtsArray[0];

    const filteredDistricts = Object.keys(districts).reduce((result, key) => {
        if (key.startsWith(regencyId)) {
            result[key] = districts[key];
        }
        return result;
    }, {});
    res.json(filteredDistricts);
});

router.get('/villages/:districtId', (req, res) => {
    const districtId = req.params.districtId;
    if (districtId.length < 7) {
        return res.status(400).json({ error: 'District ID must be at least 7 digits long' });
    }
    
    const villagesArray = readJsonFile('villages.json');
    const villages = villagesArray[0];

    const filteredVillages = Object.keys(villages).reduce((result, key) => {
        if (key.startsWith(districtId)) {
            result[key] = villages[key];
        }
        return result;
    }, {});
    res.json(filteredVillages);
});


module.exports = router;