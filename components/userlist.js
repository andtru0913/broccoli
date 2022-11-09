const List = ({users}) =>{
    return(
        <div>
            Kommer:
            <ol>
                {users.filter(function (u) {return u.coming}).map((user) =>
                    <li key={user.user.firstname} >{user.user.firstname} {user.user.lastname}</li>
                )}
            </ol>
            Kommer ej:
            <ol>
                {users.filter(function (u) {return !u.coming}).map((user) =>
                    <li key={user.user.firstname} >{user.user.firstname} {user.user.lastname}</li>
                )}
            </ol>
        </div>
    )
}

export default List