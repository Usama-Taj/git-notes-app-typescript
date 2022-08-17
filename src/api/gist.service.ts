import { GistTypes } from "types";

// const buf = Buffer.from(str, "base64");
const AUTH_HEADER = `Basic ${btoa(
  `${process.env.USERNAME}:${process.env.API_KEY}`
)}`;

// Callback Functions Start
const handleJSONError = (response: any) => {
  if (!response.ok) {
    console.log(response.statusText);
  }
  return response.json();
};
const handlTextFileError = (response: any) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.text();
};
const getResponse = (response: any) => response;

// Callback Functions End

/**
 * GET API Functions
 * @returns Promise
 */
const getPublicGists = (page: number) => {
  const queryString: URLSearchParams = new URLSearchParams();
  queryString.append("per_page", "10");
  queryString.append("page", page.toString());
  return fetch(`${process.env.API_URL}/gists/public?${queryString}`, {
    method: "GET",
    cache: "no-store",

    headers: {
      Accept: process.env.API_ACCEPT,
      Authorization: AUTH_HEADER,
    },
  })
    .then(handleJSONError)
    .then(getResponse)
    .catch((error) => {
      throw new Error("Sorry, Cannot Fetch Public Gists", error);
    });
};

const getPublicStarredGists = (page: number) => {
  const queryString: URLSearchParams = new URLSearchParams();
  queryString.append("per_page", "10");
  queryString.append("page", page.toString());
  return fetch(`${process.env.API_URL}/gists/starred?${queryString}`, {
    method: "GET",
    cache: "no-store",

    headers: {
      Accept: process.env.API_ACCEPT,
      Authorization: AUTH_HEADER,
    },
  })
    .then(handleJSONError)
    .then(getResponse)
    .catch((error) => {
      throw new Error("Sorry, Cannot Fetch Public Gists", error);
    });
};

const getGist = (gist_id: string) => {
  return fetch(`${process.env.API_URL}/gists/${gist_id}`, {
    method: "GET",
    cache: "no-store",

    headers: {
      Accept: process.env.API_ACCEPT,
      Authorization: AUTH_HEADER,
    },
  })
    .then(handleJSONError)
    .then(getResponse)
    .catch((error) => {
      throw new Error("Sorry, Cannot Fetch Gist", error);
    });
};

const getGistFile = (url: string) => {
  return fetch(url, {
    method: "GET",
    cache: "no-store",
    headers: {
      Authorization: AUTH_HEADER,
    },
  })
    .then(handlTextFileError)
    .then(getResponse)
    .catch((error) => {
      throw new Error("Sorry, Cannot Fetch Gist File", error);
    });
};

const getGistsByUser = (username: string, page?: number) => {
  const queryString: URLSearchParams = new URLSearchParams();
  if (page) {
    queryString.append("per_page", "10");
    queryString.append("page", page.toString());
  }
  return fetch(
    `${process.env.API_URL}/users/${username}/gists${
      page ? `?${queryString}` : ""
    }`,
    {
      method: "GET",
      cache: "no-store",

      headers: {
        Accept: process.env.API_ACCEPT,
        Authorization: AUTH_HEADER,
      },
    }
  )
    .then(handleJSONError)
    .then(getResponse)
    .catch((error) => {
      throw new Error("Sorry, Cannot Fetch Gist For User", error);
    });
};

const checkGistStar = (gist_id: string) => {
  return fetch(`${process.env.API_URL}/gists/${gist_id}/star`, {
    method: "GET",
    cache: "no-store",

    headers: {
      Accept: process.env.API_ACCEPT,
      Authorization: AUTH_HEADER,
    },
  })
    .then((response) => {
      if (!response.ok) {
        return false;
      }
      return true;
    })
    .then(getResponse)
    .catch((error) => {
      throw new Error("Sorry, Cannot Find Gist Star Status", error);
    });
};

/**
 * UPDATE API FUNCTIONS
 * @param gist_id
 * @returns Promise
 */
const updateAGist = (data: GistTypes) => {
  const { gist_id } = data;
  return fetch(`${process.env.API_URL}/gists/${gist_id}`, {
    method: "PATCH",
    headers: {
      Authorization: AUTH_HEADER,
      Accept: process.env.API_ACCEPT,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        return false;
      }
      return true;
    })
    .then(getResponse)
    .catch((error) => {
      throw new Error("Sorry, Cannot Star a Gist", error);
    });
};
const forkOneGist = (gist_id: string) => {
  return fetch(`${process.env.API_URL}/gists/${gist_id}/fork`, {
    method: "POST",
    headers: {
      Authorization: AUTH_HEADER,
      Accept: process.env.API_ACCEPT,
    },
  })
    .then((response) => {
      if (!response.ok) {
        return false;
      }
      return true;
    })
    .then(getResponse)
    .catch((error) => {
      throw new Error("Sorry, Cannot Fork a Gist", error);
    });
};

const starOneGist = (gist_id: string) => {
  return fetch(`${process.env.API_URL}/gists/${gist_id}/star`, {
    method: "PUT",
    headers: {
      Authorization: AUTH_HEADER,
      Accept: process.env.API_ACCEPT,
    },
  })
    .then((response) => {
      if (!response.ok) {
        return false;
      }
      return true;
    })
    .then(getResponse)
    .catch((error) => {
      throw new Error("Sorry, Cannot Star a Gist", error);
    });
};

const unStarOneGist = (gist_id: string) => {
  return fetch(`${process.env.API_URL}/gists/${gist_id}/star`, {
    method: "DELETE",
    headers: {
      Authorization: AUTH_HEADER,
      Accept: process.env.API_ACCEPT,
    },
  })
    .then((response) => {
      if (!response.ok) {
        return false;
      }
      return true;
    })
    .then(getResponse)
    .catch((error) => {
      throw new Error("Sorry, Cannot UnStar a Gist", error);
    });
};
/**
 * CREATE GIST APIS
 * @param data
 * @returns Promise
 */
const createAGist = (data: GistTypes) => {
  return fetch(`${process.env.API_URL}/gists`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: AUTH_HEADER,
      Accept: process.env.API_ACCEPT,
    },
    body: JSON.stringify(data),
  })
    .then(handleJSONError)
    .then(getResponse)
    .catch((error) => {
      throw new Error("Sorry, Cannot Star a Gist", error);
    });
};

/**
 * Delete GIST API
 * @param gist_id
 * @returns Promise
 */
const deleteAGist = (gist_id: string) => {
  return fetch(`${process.env.API_URL}/gists/${gist_id}`, {
    method: "DELETE",
    headers: {
      Authorization: AUTH_HEADER,
      Accept: process.env.API_ACCEPT,
    },
  })
    .then((res) => {
      if (res.ok) {
        return true;
      }
      return false;
    })
    .then(getResponse)
    .catch((error) => {
      throw new Error("Sorry, Cannot Delete a Gist", error);
    });
};

export {
  getGistFile,
  starOneGist,
  forkOneGist,
  getGist,
  getPublicGists,
  getGistsByUser,
  createAGist,
  unStarOneGist,
  checkGistStar,
  getPublicStarredGists,
  deleteAGist,
  updateAGist,
};
