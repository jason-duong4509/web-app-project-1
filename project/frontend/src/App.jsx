import ProfileUI from "./react-files/profile-react" //Import the react file that contains everything needed to load the profile UI

function App() {
  const [newPage, navigateTo] = React.useState("profile") //Define a use state function for when we want to switch UIs through react (DOES NOTHING RIGHT NOW SINCE THERE'S ONLY ONE REACT UI FOR THIS PROJECT)

  return (
    <>
    {/*--Decide what UI to render based on newPage. Give the component function navigateTo() for when switching between UIs--*/}
    {newPage == "profile" && <ProfileUI navigateTo={navigateTo}/>}
    {/*----------------------------------------------------------------------------------------------------------------------*/}
    </>
  )
}

export default App
