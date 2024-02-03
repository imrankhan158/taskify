/**
 * @type string
 */
export const DB_NAME = "taskify";

/**
 * @type {{ GITHUB: "GITHUB"; EMAIL_PASSWORD: "EMAIL_PASSWORD"} as const}
 */
export const UserLoginType = {
  GITHUB: "GITHUB",
  EMAIL_PASSWORD: "EMAIL_PASSWORD",
};

export const AvailableSocialLogins = Object.values(UserLoginType);

/**
 * @type {{ ADMIN: "ADMIN"; INDIVIDUAL: "INDIVIDUAL"} as const}
 */
export const UserRole = {
  ADMIN: "ADMIN",
  INDIVIDUAL: "INDIVIDUAL",
};
