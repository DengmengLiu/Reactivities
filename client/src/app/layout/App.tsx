import { Box, Container, CssBaseline, Typography } from "@mui/material"
import { useState } from "react"
import Navbar from "./Navbar"
import ActivityDashboard from "../../features/activities/dashborad/ActivityDashboard"
import { useActivities } from "../../lib/hooks/useActivities"

function App() {

  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  // Local state for activities
  // const [activities, setActivities] = useState<Activity[]>([]);
  // useEffect(() => {
  //   axios.get<Activity[]>("https://localhost:5001/api/activities")
  //     .then(response => setActivities(response.data))

  //   return () => { }
  // }, [])

  // Use custom hook for fetching activities
  const {activities, isPending} = useActivities();

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find(x => x.id === id));
  }

  const handleCancelSelectedActivity = () => {
    setSelectedActivity(undefined);
  }

  const handleFormOpen = (id?: string) => {
    if (id) handleSelectActivity(id);
    else handleCancelSelectedActivity();
    setEditMode(true);
  }

  const handleFormClose = () => {
    setEditMode(false);
  }

  // This is just using to edit locally(client side). Now using Edit on sever side by useActivities(an useMutation function)
  // const handleSubmitForm = (activity: Activity) => {
  //   if (activity.id) {
  //     setActivities(activities.map(x => x.id === activity.id ? activity : x));
  //   } else {
  //     const newActivity = {...activity, id: activities.length.toString()}
  //     setSelectedActivity(newActivity);
  //     setActivities([...activities, newActivity]);
  //   }
  //   console.log(activity);
  //   setEditMode(false);
  // }

  // This is just using to delete locally(client side). Now using Delete on sever side by useActivities(an useMutation function)
  // const handleDeleteActivity = (id: string) => {
  //   // setActivities(activities.filter(x => x.id !== id));
  //   console.log(id);
  // }

  return (
    <Box sx={{ backgroundColor: '#eeeeee', height: '100vh' }}>
      <CssBaseline />
      <Navbar openFrom={handleFormOpen} />
      <Container maxWidth='xl' sx={{ mt: 3 }}>
        {!activities || isPending ? (
          <Typography>Loading...</Typography>
        ) : (
          <ActivityDashboard
            activities={activities}
            selectActivity={handleSelectActivity}
            cancelSelectedActivity={handleCancelSelectedActivity}
            selectedActivity={selectedActivity}
            editMode={editMode}
            openForm={handleFormOpen}
            closeForm={handleFormClose}
          />)}

      </Container>

    </Box>
  )

}

export default App
