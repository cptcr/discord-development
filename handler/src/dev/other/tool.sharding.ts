import { env } from "node:process";
import { info, custom } from "../utils/logs";
const sharding = env.USE_SHARDING || undefined; 

/**
 * Function to use less lines in shard.ts lol
 * @returns { useSharding | typeSharding } - Returns if sharding is used and the type of sharding used.
 */

export default async function shardingAcceleration() {
    let useSharding: boolean = false;
    let typeSharding: "auto" | number | undefined = undefined;
  
    if (sharding === "auto") {
      typeSharding = "auto";
      useSharding = true;
      custom(true, "SHARD", "Sharding is enabled and runs on auto mode.")
    } else if (typeof sharding === "number") {
      typeSharding = sharding;
      useSharding = true;
      custom(true, "SHARD", `Sharding is enabled and runs with ${sharding} shards.`);
    } else if (sharding === "false" || undefined) {
      useSharding = false;
      typeSharding = undefined;
    }
  
    return {
      useSharding: useSharding,
      typeSharding: typeSharding
    };
}
  