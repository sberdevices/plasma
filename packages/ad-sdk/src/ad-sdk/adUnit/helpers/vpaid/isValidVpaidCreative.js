import { METHODS } from "./api";

const isValidVpaidCreative = (creative) => METHODS.every((method) => typeof creative[method] === "function");

export default isValidVpaidCreative;
