// Sample Unique ID generator
export const IDGenerator = (): string => {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};
