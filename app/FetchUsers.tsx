
type FetchUserProps = {
  search: string
}

export const FetchUsers = async ({ search }: FetchUserProps) => {

  const response = await fetch(`http://localhost:3000/users?search=${search}`)
  const users = await response.json()

  return (
    <div>
      <pre>
        {JSON.stringify({ users }, null, 2)}
      </pre>
    </div>
  )
}