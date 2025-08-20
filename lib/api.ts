const API_BASE =
  process.env.NODE_ENV === "production"
    ? "/api" // production → nginx forwards to backend
    : "http://localhost:4002"; // local dev → direct backend

export async function fetchAPI(
  endpoint: string,
  options: RequestInit = {} // Allow all properties of RequestInit (method, headers, body, etc.)
) {
  const url = `${API_BASE}${endpoint}`;
  const response = await fetch(url, options);

  let data;
  try {
    data = await response.json(); // Essaye de parser la réponse JSON
  } catch {
    // Si le backend ne renvoie pas du JSON
    throw new Error(`Le serveur a renvoyé un contenu invalide: ${await response.text()}`);
  }

  if (!response.ok) {
    // Si la réponse n'est pas OK, récupère le message d'erreur du backend si possible
    const message = data?.error || `HTTP error! Status: ${response.status}`;
    throw new Error(message);
  }

  return data;
}
