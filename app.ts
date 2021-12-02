import { readFileSync } from "fs";

/**
 * Get today's roll coaster earning from a file.
 * @param fileName File name path
 */
export const app = (fileName: string) => {
  console.info("Roll coaster: Input file:", fileName);

  // Get all file's data
  const data: string[] = readFileSync(fileName, "utf-8").split("\n");
  // Get today's info
  const info: string = data.shift() as string;
  const [seatsCount, ridesCount, groupsCount] = info
    .split(" ")
    .map((row) => parseInt(row));
  console.info(
    `Roll coaster: FLASH INFO! There is available ${seatsCount} seats`,
    `for ${ridesCount} rides and we will expect to have ${groupsCount} groups today.`
  );
  // Check if the data is valid
  if (isNaN(seatsCount) || isNaN(ridesCount) || isNaN(groupsCount)) {
    console.error("Roll coaster: Error: Invalid entry");
    process.exit(1);
  }
  // Get groups and check if the group's length is matching with our expectation (groupsCount)
  let groups = data.map((row) => parseInt(row)).filter((row) => !isNaN(row));
  if (groupsCount !== groups.length) {
    console.error(
      "Roll coaster: Error: The group count must equal to the groups."
    );
    process.exit(1);
  }
  // Read today's earning
  console.info(
    "Roll coaster: Total earning:",
    calculateEarning(seatsCount, ridesCount, groups)
  );
};

/**
 * Daily roll coaster earning
 * @param seatsCount Available seat in the roll coaster
 * @param ridesCount Rides for the day
 * @param groups Groups of people waiting in the queue
 * @returns Final day recipie
 */
export const calculateEarning = (
  seatsCount: number,
  ridesCount: number,
  groups: number[]
) => {
  // Final day recipie
  let earning: number = 0;
  for (let i = 0; i < ridesCount; i++) {
    // Ride total amount.
    let totalRideAmount = 0;
    // All groups that has been passed.
    const pastGroups = [];
    // if the available seats are less than current groups stop the roll coaster
    // by returning the revenue
    if (groups[0] > seatsCount) {
      return earning;
    }
    while (totalRideAmount + groups[0] <= seatsCount) {
      // Current group that want to take the roll coaster
      const currentGroup: number = groups.shift() as number;
      // Pushing the value to the pastGroups
      pastGroups.push(currentGroup);
      // Adding the amount
      totalRideAmount += currentGroup;
    }
    // Adding earning to the global earning
    earning += totalRideAmount;
    // Pushing new values so all the ones who did the roll coaster will be in the last of the list
    groups.push(...pastGroups);
  }
  return earning;
};

// Get command line argument count
const argvCount = process.argv.length;
// We expect to have in the second argument the file name.
argvCount > 2
  ? app(process.argv[2])
  : console.error("Roll coaster:", "Invalid arguments.");
