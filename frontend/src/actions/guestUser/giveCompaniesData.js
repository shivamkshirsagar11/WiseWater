const giveCompaniesData = async () => {

    try {
        const response = await fetch(`/api/user/show-companies`);
        const data = await response.json();
        console.log(data.companies)
        return {
            type: 'data',
            companiesData: data.companies,
        }
    } catch (error) {
        return {
            type: 'error',
            error: 'some thing went wrong please try again',
        }
    }

}

export { giveCompaniesData }