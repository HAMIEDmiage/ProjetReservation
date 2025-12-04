const BASE_URL = "https://daviddurand.info/D228/gres";

/* ===============================
     FONCTION UTILITAIRE API
================================ */
async function apiRequest(
  path: string,
  method: string = "GET",
  token?: string,
  body?: any
) {
  const headers: any = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();
  let json = null;

  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }

  if (!response.ok) {
    throw json || { error: "Erreur inconnue" };
  }

  return json;
}

/* ===============================
        AUTHENTIFICATION
================================ */

export function login(email: string, password: string) {
  return apiRequest("/auth/login", "POST", undefined, { email, password });
}

export function registerUser(name: string, email: string, password: string) {
  return apiRequest("/auth/register", "POST", undefined, {
    name,
    email,
    password,
  });
}

/* ===============================
          RESSOURCES
================================ */

export function fetchResources() {
  return apiRequest("/ressources");
}

export function fetchResource(id: number) {
  return apiRequest(`/ressources/${id}`);
}

/* ===============================
         DISPONIBILITÉ
================================ */

export function checkAvailability(
  resource_id: number,
  date: string,
  start_time: string,
  end_time: string
) {
  return apiRequest("/disponibilite", "POST", undefined, {
    resource_id,
    date,
    start_time,
    end_time,
  });
}

/* ===============================
        RÉSERVATIONS
================================ */

/* Récupérer MES réservations */
export function fetchMyReservations(token: string) {
  return apiRequest("/reservations", "GET", token);
}

/* Réservations de la semaine */
export function fetchWeeklyReservations(token: string) {
  return apiRequest("/reservations/semaine", "GET", token);
}

/* Faire une réservation */
export function makeReservation(
  resource_id: number,
  date: string,
  start_time: string,
  end_time: string,
  token: string
) {
  return apiRequest(
    "/reservations",
    "POST",
    token,
    { resource_id, date, start_time, end_time }
  );
}

/* Annuler une réservation */
export function deleteReservation(id: number, token: string) {
  return apiRequest(`/reservations/${id}`, "DELETE", token);
}

