import AccountInfo from "../components/AccountInfo";


function Account({user}) {

    

    return (
        <div className="flex justify-center">
            
            {user ? 

                <AccountInfo user={user} />
                
                : <p>Cargando información</p>
            }
            
        </div>
    );
}

export default Account;