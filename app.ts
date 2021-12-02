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
