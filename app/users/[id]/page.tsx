type User = {
  user: {
    id: number;
    name: string;
    email: string;
  };
};

async function getUserData(id: string) {
  const apiEndpoint = process.env.API_ENDPOINT;

  try {
    const { user }: User = await fetch(`${apiEndpoint}/api/users/${id}`).then((data) => data.json());
    return { user, error: null };
  } catch (error) {
    console.error(error);
    return { user: null, error };
  }
}

export default async function UserPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getUserData(params.id);
  const user = data.user;

  if (user === null) {
    return <h1>User not found</h1>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
