import { useLoaderData } from "react-router-dom";

const Update = () => {
    const user = useLoaderData()
    console.log(user)

   
    return (
        <div>
            <h1>{user.name} You could update your Profile!</h1>
            <form onSubmit={handleUpdate}>
                <input type="text" name="name" defaultValue={user?.name} id="" /><br />
                <input type="email" name="email" defaultValue={user?.email} id="" /><br />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default Update;