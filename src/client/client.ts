const login = async (email: string, password: string) => {
  try {
    const response = await fetch('http://localhost:3000/auth/admin', {
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
    const response = await fetch('http://localhost:3000/users', {
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
    return await fetch(`http://localhost:3000/users/${userId}`, {
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
    return await fetch(`http://localhost:3000/users/${id}`, {
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
    const response = await fetch('http://localhost:3000/hikes', {
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
    return await fetch(`http://localhost:3000/hikes/${id}`, {
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
    const response = await fetch('http://localhost:3000/alerts', {
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
    return await fetch(`http://localhost:3000/alerts/${id}`, {
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
  login, getUsers, updateUser, deleteUser, getHikes, deleteHike, getAlerts, deleteAlert,
};
