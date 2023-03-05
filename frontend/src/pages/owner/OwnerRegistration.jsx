import React, { useContext, useState } from "react";
import { registerUser } from "../../actions/shared/registerUser.js";
import MultiToast from "../../actions/shared/MultiToast.js";
import CompanyDetailsForm from "../shared/form/CompanyDetailsForm.jsx";
import UserDetailsForm from "../shared/form/UserDetailsForm.jsx";
import { CookiesContext } from "../../context/CookiesProvider.js";
import OTP from "../shared/form/OTP.jsx";

export default function OwnerRegistration() {
	const [flag, setFlag] = useState(false);

	const { setCookies } = useContext(CookiesContext);
	const [userData, setUserData] = useState({
		firstname: "",
		lastname: "",
		email: "",
		password: "",
		confirmPassword: "",
		contact: "",
	});

	const [companyData, setCompanyData] = useState({
		name: "",
		email: "",
		contact: "",
		serviceTime: "",
		address: { line1: "", line2: "", city: "", pincode: "", state: "" },
		waterPrice: { coldWater: '', normalWater: '', hotWater: '' }
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await registerUser("owner", owner, true);
		console.log(response);
		if ("error" === response.type) MultiToast(response.error, true);
		else setFlag(true);
	};
	const owner = { userData: { ...userData }, companyData: { ...companyData } };
	const styles = {
		backgroundColor: '#bbdefb',

	};
	return (
		<body style={styles}>
			{!flag && (
				<div className="container" style={{ backgroundColor: "#e3f2fd" }}>
					<h1 className="text-center " style={{ color: '#0077be' }}>
						<span className="fw-bold">Owner Registration </span>
					</h1>
					<form method="post">
						<UserDetailsForm userData={userData} setUserData={setUserData} />
						<CompanyDetailsForm
							companyData={companyData}
							setCompanyData={setCompanyData}
						/>

						<div className="text-center">
							<button type="submit" onClick={handleSubmit} className="btn" style={{ backgroundColor: "#0077be", color: 'white' }}>
								Submit
							</button>
						</div>
					</form>
				</div>
			)}
			{flag && (
				<OTP
					userData={owner}
					userType="owner"
					register={registerUser}
					setCookies={setCookies}
					navigateString={"/"}
					requiredCookie={2}
					toastMsg={"you are registered successfully"}
				/>
			)}
		</body>
	);
}
