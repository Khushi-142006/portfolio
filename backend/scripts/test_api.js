
const testApi = async () => {
  try {
    const res = await fetch("http://127.0.0.1:5000/api/profile");
    console.log("Status:", res.status);
    const data = await res.json();
    console.log("Profile data:", data);
  } catch (err) {
    console.error("Fetch error:", err);
  }
};
testApi();
