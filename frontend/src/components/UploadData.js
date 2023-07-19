import { useNavigate } from "react-router-dom";
import UploadStore from "../stores/UploadStore";


const UploadData = () => {
    const store = UploadStore()
    const navigate = useNavigate()

    const onUpload = () => {
        store.onUpload();
        navigate("/dashboard")
    }

    return (
        <div>
            <h1>UPLOAD CSV</h1>
            <div>
                <input type="file" onChange={store.onChange} />
				<button onClick={onUpload}>Upload</button>
            </div>
        </div>
    );
}

export default UploadData