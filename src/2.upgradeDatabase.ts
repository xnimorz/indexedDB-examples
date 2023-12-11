import { openConnection } from "./dbConnection";

export function upgradeDatabase() {
  return openConnection();
}
