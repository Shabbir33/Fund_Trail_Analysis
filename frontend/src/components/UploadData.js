import { useNavigate } from "react-router-dom";
import store from "../stores/store";

const UploadData = () => {
    const Store = store()
    // const navigate = useNavigate()

    // const accNos = Object.keys(Store.data)

    const onUpload = async () => {
        await Store.onUpload();
        
        // accNos.length > 0 ? navigate(`/dashboard/${accNos[0]}`): <></>
    }

    return (
        <div>
            <h1>UPLOAD CSV</h1>
            <div>
                <input type="file" onChange={Store.onChange} />
				<button onClick={onUpload}>Upload</button>
            </div>
        </div>
    );
}

export default UploadData