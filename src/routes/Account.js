import AccountInfo from "../components/AccountInfo";


function Account({user, setUser}) {

    

    return (
        <div className="flex justify-center min-h-full">
            
            {user ? 

                <AccountInfo user={user} setUser={setUser} />
                
                : <p>Cargando información</p>
            }
            
        </div>
    );
}

export default Account;