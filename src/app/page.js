import HomePage from "@/components/HomePage";

const API_URL =
  process.env.CAT_API_URL || "https://api.thecatapi.com/v1/breeds";

// Fetch cats data from the API with error handling
async function fetchCats() {
  try {
    const res = await fetch(API_URL, {
      cache: "no-store", // Fetch fresh data on every request
    });

    if (!res.ok) {
      const errorMessage = `Error: ${res.status} ${res.statusText}`;
      throw new Error(errorMessage);
    }

    const data = await res.json();
    return {
      cats: data.map((cat) => ({
        id: cat.id,
        name: cat.name,
        description: cat.description,
        image: cat.image?.url,
      })),
      error: null,
    };
  } catch (error) {
    console.error("Error fetching data from The Cat API:", error);
    return { cats: [], error: error.message };
  }
}

export default async function Home() {
  const { cats, error } = await fetchCats(); // Fetch cat data and handle errors

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cat Breeds</h1>
      {error ? (
        <div className="text-center text-red-500 mb-4">{error}</div>
      ) : (
        <HomePage initialCats={cats} />
      )}
    </div>
  );
}
