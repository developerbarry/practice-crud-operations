import './App.css'

function App() {

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const newUser = { name, email }
    console.log(newUser)

    fetch('http://localhost:5000/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        if(data.insertedId){
          alert('User Successfully Added');
          form.reset()
        }
      })

  }

  return (
    <>
      <h1>Simple CRUD</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="name" id="" /><br />
        <input type="email" name="email" id="" /><br />
        <input type="submit" value="Add User" />
      </form>

    </>
  )
}

export default App
