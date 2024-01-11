import "./style.css";
function DataNotFound() {
    return (<>
        <div className='error-container'>
            <div>
                <strong className="error-code">ERROR - 404</strong>
                <p className="error-message">Data Not Found...</p>
            </div>
        </div>
    </>);
}

export default DataNotFound;