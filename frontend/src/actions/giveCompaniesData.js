const giveCompaniesData = async () => {
    const response = await fetch(`http://localhost:3001/api/user/show-companies`);

    const data = await response.json();

    return data.companies;
}

export { giveCompaniesData }