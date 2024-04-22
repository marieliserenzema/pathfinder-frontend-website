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
    return error;
  }
};

export default { login };
