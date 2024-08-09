export const updateYamlFile = async (
  point1: { x: number; y: number },
  point2: { x: number; y: number }
) => {
  try {
    const response = await fetch("http://localhost:3001/update-line", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ point1, point2 }),
    });
    if (response.ok) {
      console.log("YAML file updated successfully");
    } else {
      console.error("Failed to update YAML file");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
