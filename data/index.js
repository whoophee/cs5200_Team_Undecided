const companies = require('./companies.json');
const request = require('superagent');

const baseURL = 'http://localhost:8080/';

(async () => {
    await Promise.all(companies.map((company, idx) => request
        .post(baseURL + 'api/companies/')
        .send({
            name: company.company_name,
            username: 'company' + idx,
            password: 'company' + idx,
            headquartersText: company.headquarters_text,
            size: company.size_text,
            industry: company.industry_text,
            description: company.about_text
        })));
    console.log('done');
})();