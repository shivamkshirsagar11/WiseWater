import React, { useState } from "react";
import { registerUser } from "../../actions/shared/registerUser.js";
import MultiToast from "../../actions/shared/MultiToast.js";
import CompanyDetailsForm from "../shared/form/CompanyDetailsForm.jsx";
import UserDetailsForm from "../shared/form/UserDetailsForm.jsx";
import OTP from "../shared/form/OTP.jsx";

export default function OwnerRegistration({ setCookies }) {
	const [flag, setFlag] = useState(false);
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
		if ("error" === response.type) MultiToast(response.error, true);
		else setFlag(true);
	};
	const owner = { userData: { ...userData }, companyData: { ...companyData } };
	return (
		<>
			{!flag && (
				<div>
					<form method="post">
						<UserDetailsForm userData={userData} setUserData={setUserData} />

						{/* company */}
						<CompanyDetailsForm
							companyData={companyData}
							setCompanyData={setCompanyData}
						/>

						<button type="submit" onClick={handleSubmit}>
							Submit
						</button>
					</form>
				</div>
			)}
			{flag && (
				<OTP
					userData={owner}
					userType="owner"
					register={registerUser}
					setCookies={setCookies}
					navigateString={"/owner/profile"}
					requiredCookie={2}
					toastMsg={"you are registered successfully"}
				/>
			)}
		</>
	);
}
