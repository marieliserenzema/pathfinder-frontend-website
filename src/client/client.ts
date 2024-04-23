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

export default { login, getUsers };
