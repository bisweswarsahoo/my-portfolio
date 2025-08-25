import "../styles/SocialInfo.css";
import { FaInstagram, FaTwitter, FaGithub, FaDiscord } from "react-icons/fa";

const SocialInfo = () => {
	return (
		<>
			<div className="main">
				<button className="card1">
					<FaInstagram
						className="instagram"
						size={30}
					/>
				</button>
				<button className="card2">
					<FaTwitter
						className="twitter"
						size={30}
					/>
				</button>
				<button className="card3">
					<FaGithub
						className="github"
						size={30}
					/>
				</button>
				<button className="card4">
					<FaDiscord
						className="discord"
						size={30}
					/>
				</button>
			</div>
		</>
	);
};

export default SocialInfo;
