import React from 'react'

interface ProfileProps {
  name: string
  age: number
}

const Profile: React.FC<ProfileProps> = ({ name, age }) => {
  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  )
}

interface AnotherProfileProps {
  name: string
  profile?: React.ReactElement<typeof Profile>
}

const AnotherProfile: React.FC<AnotherProfileProps> = ({ name, profile }) => {
  // Don't know if it's a good idea to do this
  // or am I just making things more complicated?
  if (profile && profile.type !== Profile) {
    throw new Error('It must be a <Profile {...} /> component')
  }

  return (
    <div>
      <h1>Another Profile</h1>
      <p>Name: {name}</p>
      {profile && <div>{profile}</div>}
    </div>
  )
}

const Test = () => {
  return <h1>Hello!</h1>
}

const App: React.FC = () => {
  return (
    <div>
      <AnotherProfile name="John" profile={<Test />} />
    </div>
  )
}

export default App
