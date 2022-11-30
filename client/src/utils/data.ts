import carTyre from "../images/jpg/pexels-photo-3806249.jpeg";
import carBattery from "../images/jpg/pexels-photo-8556051.jpeg";
import carEngine from "../images/jpg/carEngine.jpeg";
import carWiper from "../images/jpg/carWiper.jpeg";
import windShield from "../images/jpg/windShield.jpeg";
import sideMirror from "../images/jpg/sideMirror.jpeg";
import carDoors from "../images/jpg/carDoors.jpeg";
import seat from "../images/jpg/seat-cushion-g8cfbff1d9_1280.jpg";

export const linksData = ["Home", "About", "Products", "Contact"];

export const blogData: {
	title: string;
	image: string;
	description: string;
}[] = [
	{
		title: "8 things to consider when choosing a car seat",
		image: seat,
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, voluptate odit distinctio corporis quisquam quidem nemo tempora illum suscipit, id at fuga necessitatibus voluptatibus excepturi harum sunt molestiae ad recusandae.",
	},
	{
		title: "Changing your car battery the easy way",
		image: carBattery,
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, voluptate odit distinctio corporis quisquam quidem nemo tempora illum suscipit, id at fuga necessitatibus voluptatibus excepturi harum sunt molestiae ad recusandae.",
	},
	{
		title: "Effective ways to change a car tire",
		image: carTyre,
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, voluptate odit distinctio corporis quisquam quidem nemo tempora illum suscipit, id at fuga necessitatibus voluptatibus excepturi harum sunt molestiae ad recusandae.",
	},
];

export const categoryData: {
	name: string;
	description: string;
	button: string;
	image: string;
}[] = [
	{
		name: "Tires",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
		button: "fa-solid fa-arrow-right",
		image: carTyre,
	},
	{
		name: "Engine",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
		button: "fa-solid fa-arrow-right",
		image: carEngine,
	},
	{
		name: "Side Mirrors",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
		button: "fa-solid fa-arrow-right",
		image: sideMirror,
	},
	{
		name: "Doors",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
		button: "fa-solid fa-arrow-right",
		image: carDoors,
	},
	{
		name: "WindShield",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
		button: "fa-solid fa-arrow-right",
		image: windShield,
	},
	{
		name: "Wipers",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
		button: "fa-solid fa-arrow-right",
		image: carWiper,
	},
	{
		name: "Seat",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
		button: "fa-solid fa-arrow-right",
		image: seat,
	},
];
