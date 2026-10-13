import React from "react";
import MilestoneCard from "./MilestoneCard";

/**
 * Card component wrapper around MilestoneCard
 * Maintains backward compatibility while utilizing the new cinematic design.
 */
const Card = (props) => {
	return <MilestoneCard {...props} />;
};

export default Card;
