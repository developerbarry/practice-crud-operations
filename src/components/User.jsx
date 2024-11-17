import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const User = () => {
    const userData = useLoaderData()
    const [users, setUser] = useState(userData)

    

    return (
        <div>
            <h1>Total Users: {users.length}</h1>
            <div>
                {
                    users.map((element) => (
                        <div key={element._id} style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems:'center', marginBottom: '10px' }}>
                            <p> {element.name} : {element.email}</p>
                            <Link to={`/updated/${element._id}`}>Update</Link>
                            <button onClick={() => handleDelete(element._id)}>Delete</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default User;