const url = import.meta.env.VITE_API_URL;

const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${url}/auth/admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getUsers = async () => {
  try {
    const response = await fetch(`${url}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });

    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateUser = async (userId: string, data: string) => {
  try {
    return await fetch(`${url}/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: data,
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

const deleteUser = async (id: string) => {
  try {
    return await fetch(`${url}/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getHikes = async () => {
  try {
    const response = await fetch(`${url}/hikes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });

    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const deleteHike = async (id: string) => {
  try {
    return await fetch(`${url}/hikes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getAlerts = async () => {
  try {
    const response = await fetch(`${url}/alerts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });

    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const deleteAlert = async (id: string) => {
  try {
    return await fetch(`${url}/alerts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getComments = async () => {
  try {
    const response = await fetch(`${url}/comments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });

    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const deleteComment = async (id: string) => {
  try {
    return await fetch(`${url}/comments/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default {
  login, getUsers, updateUser, deleteUser, getHikes, deleteHike, getAlerts, deleteAlert, getComments, deleteComment,
};
