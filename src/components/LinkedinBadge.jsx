import React from "react";

const LinkedinBadge = () => {
	return (
		<section className="flex flex-col items-center gap-4">
			<div
				className="badge-base LI-profile-badge"
				data-locale="en_US"
				data-size="medium"
				data-theme="dark"
				data-type="VERTICAL"
				data-vanity="bisweswarsahoo"
				data-version="v1"
			/>

			<script
				src="https://platform.linkedin.com/badges/js/profile.js"
				async
				defer
				type="text/javascript"
			></script>
		</section>
	);
};

export default LinkedinBadge;
