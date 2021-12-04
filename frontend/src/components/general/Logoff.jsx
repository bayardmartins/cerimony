const Logoff = () => {
    const handleLogoff = () => {
        localStorage.removeItem('token');
    };

    if (localStorage.getItem('token')){
        return (
            <a href={"/"} onClick={handleLogoff} class="btn btn-primary">Logoff</a>
        )  
    } else {
        return null;
    }
    
};

export default Logoff;