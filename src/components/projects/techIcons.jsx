import {
	SiReact,
	SiTypescript,
	SiJavascript,
	SiPython,
	SiFastapi,
	SiFlask,
	SiExpress,
	SiMongodb,
	SiPostgresql,
	SiFirebase,
	SiLeaflet,
	SiSocketdotio,
	SiDocker,
	SiAntdesign,
	SiGooglechrome,
	SiExpo,
	SiRedux
} from "react-icons/si";
import {
	FaNodeJs,
	FaJava,
	FaGithub,
	FaDatabase,
	FaBolt,
	FaFilm,
	FaBrain,
	FaLock,
	FaCode
} from "react-icons/fa";

export const getTechIcon = (techName = "") => {
	const name = techName.toLowerCase();
	
	if (name.includes("react native") || name.includes("react")) return SiReact;
	if (name.includes("typescript")) return SiTypescript;
	if (name.includes("javascript")) return SiJavascript;
	if (name.includes("python")) return SiPython;
	if (name.includes("fastapi")) return SiFastapi;
	if (name.includes("flask")) return SiFlask;
	if (name.includes("node")) return FaNodeJs;
	if (name.includes("express")) return SiExpress;
	if (name.includes("mongo")) return SiMongodb;
	if (name.includes("postgres")) return SiPostgresql;
	if (name.includes("firebase")) return SiFirebase;
	if (name.includes("leaflet")) return SiLeaflet;
	if (name.includes("socket")) return SiSocketdotio;
	if (name.includes("docker")) return SiDocker;
	if (name.includes("ant design")) return SiAntdesign;
	if (name.includes("chrome")) return SiGooglechrome;
	if (name.includes("expo")) return SiExpo;
	if (name.includes("zustand") || name.includes("redux")) return SiRedux;
	if (name.includes("mmkv") || name.includes("cache")) return FaDatabase;
	if (name.includes("yolo") || name.includes("ml") || name.includes("machine learning") || name.includes("tf-idf")) return FaBrain;
	if (name.includes("aes") || name.includes("jwt") || name.includes("encryption")) return FaLock;
	if (name.includes("tmdb") || name.includes("simkl")) return FaFilm;
	if (name.includes("flashlist") || name.includes("speed")) return FaBolt;
	if (name.includes("java")) return FaJava;
	
	return FaCode;
};
